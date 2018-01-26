// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { Node } from 'react';
import type { RequestState } from 'types/group';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';
import { logErrorIfDevEnv } from 'utils/env';
import {
  RequestDialogConfirmed,
  RequestDialogRejected,
  RequestDialogPending,
} from 'common/components';
import IconButton from 'material-ui/IconButton';
import HourglassEmptyIcon from 'material-ui-icons/HourglassEmpty';
import CheckIcon from 'material-ui-icons/Check';
import FavoriteIcon from 'material-ui-icons/Favorite';
import DoNotDisturbOnIcon from 'material-ui-icons/DoNotDisturbOn';
import RequestDialogRequest from './RequestDialogRequest';

type RequestComponents = {
  icon: Node,
  dialog: Node,
};

type Props = {
  classes: Object,
  requestState?: RequestState,
  groupId: string,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
  firestore: Object,
  auth: Object,
};

type State = {
  dialogOpen: boolean,
  redirectTo: null | string,
};

class GroupCardRequestButton extends React.Component<Props, State> {
  static defaultProps = {
    requestState: 'default',
  };

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  state = {
    dialogOpen: false,
    redirectTo: null,
  };

  get requestComponents(): RequestComponents {
    const { classes, groupId, requestState } = this.props;
    const { dialogOpen } = this.state;
    switch (requestState) {
      case 'pending':
        return {
          icon: <HourglassEmptyIcon className={classes.checkIconPending} />,
          dialog: (
            <RequestDialogPending
              opened={dialogOpen}
              onClose={this.handleClose}
            />
          ),
        };
      case 'confirmed':
        return {
          icon: <CheckIcon className={classes.checkIconConfirmed} />,
          dialog: (
            <RequestDialogConfirmed
              opened={dialogOpen}
              onClose={this.handleClose}
              viewGroup={() => this.redirectTo('/create-group')}
            />
          ),
        };
      case 'refused':
        return {
          icon: <DoNotDisturbOnIcon className={classes.checkIconRefused} />,
          dialog: (
            <RequestDialogRejected
              opened={dialogOpen}
              onClose={this.handleClose}
            />
          ),
        };
      default:
        return {
          icon: <FavoriteIcon />,
          dialog: (
            <RequestDialogRequest
              groupId={groupId}
              opened={dialogOpen}
              onClose={this.handleClose}
              sendRequest={this.sendRequest}
            />
          ),
        };
    }
  }

  handleOpen: Function;
  handleClose: Function;
  redirectTo: Function;
  sendRequest: Function;

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  redirectTo(route: string) {
    this.setState({ redirectTo: route });
  }

  async sendRequest(message: string) {
    const {
      dThrowAccentSnackbar,
      dThrowDissmissSnackbar,
      firestore,
      groupId,
      auth,
    } = this.props;
    const db = getFirebase().firestore();
    const payload = {
      ref: db.doc(`users/${auth.uid}`),
      status: 'pending',
      message,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    try {
      const collection = {
        collection: 'groups',
        doc: groupId,
        subcollections: [{ collection: 'members' }],
      };
      await firestore.add(collection, payload);
      dThrowDissmissSnackbar(
        'Your request has been sent to the group creator !'
      );
      this.redirectTo('/create-group');
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

  render() {
    const { icon, dialog } = this.requestComponents;
    const { redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <div>
        <IconButton onClick={this.handleOpen}>{icon}</IconButton>
        {dialog}
      </div>
    );
  }
}

const styles = ({ palette }) => ({
  checkIconPending: {
    color: palette.warning.main,
  },
  checkIconConfirmed: {
    color: palette.success.main,
  },
  checkIconRefused: {
    color: palette.error.main,
  },
});

const mapPropsToState = ({ firebase }) => ({
  auth: firebase.auth,
});

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  firestoreConnect(),
  withStyles(styles),
  connect(mapPropsToState, mapDispatchToProps)
)(GroupCardRequestButton);

// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import type { FetchProp } from 'types/api';

type Props = {
  classes: Object,
  opened: boolean,
  onClose: Function,
  fetch: FetchProp,
  groupId: number,
};

type State = {
  message: string,
  ticketUnits: number,
};

class RequestDialogRequest extends React.Component<Props, State> {
  static defaultProps = {};

  state = {
    message: '',
    ticketUnits: 1,
  };

  handleChanges = (field: string) => event =>
    this.setState({ [field]: event.target.value });

  sendRequest = () => {
    const { fetch, groupId } = this.props;
    const { message, ticketUnits } = this.state;
    fetch.startRequest({
      endPoint: 'members',
      method: 'POST',
      payload: {
        groupId,
        message,
        ticketUnits,
      },
    });
  };

  render() {
    const { classes, opened, onClose } = this.props;
    const { message, ticketUnits } = this.state;

    return (
      <Dialog
        open={opened}
        onClose={onClose}
        aria-labelledby="RequestDialogRequest"
      >
        <DialogTitle id="RequestDialogRequest">
          Ask to join the group
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            Your request may be accepted or rejected by the creator of the
            group.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            helperText="A nice message for the creator of the group."
            type="text"
            fullWidth
            onChange={this.handleChanges('message')}
            value={message}
          />
          <TextField
            margin="dense"
            id="ticketUnits"
            label="Number of Tickets"
            type="number"
            InputProps={{
              inputProps: {
                min: '1',
                max: '6',
              },
            }}
            fullWidth
            onChange={this.handleChanges('ticketUnits')}
            value={ticketUnits}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.sendRequest} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = ({ spacing }) => ({
  dialogContentText: {
    marginBottom: spacing.unit,
  },
});

export default withStyles(styles)(RequestDialogRequest);

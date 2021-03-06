// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { Group, RequestStatus } from 'types/group';
import moment from 'moment';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import Badge from 'material-ui/Badge';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import AdminIcon from 'material-ui-icons/Star';
import amber from 'material-ui/colors/amber';
import red from 'material-ui/colors/red';
import { Link } from 'react-router-dom';
import TicketsProgess from 'common/components/TicketsProgress';
import GroupCardRequestButton from './GroupCardRequestButton';

type Props = {
  classes: Object,
  group: Group,
  auth?: Object,
  requestStatus: RequestStatus,
  managerMode?: boolean,
};

type State = {
  popover: {
    info: null | HTMLElement,
    pendingRequests: null | HTMLElement,
  },
};

class GroupCard extends React.Component<Props, State> {
  static defaultProps = {
    info: null,
    auth: null,
    managerMode: false,
  };

  constructor(props) {
    super(props);
    this.handlePopoverClick = this.handlePopoverClick.bind(this);
    this.getPopover = this.getPopover.bind(this);
  }

  state = {
    popover: {
      info: null,
      pendingRequests: null,
    },
  };

  get avatar() {
    const { classes, group: { admin }, auth, managerMode } = this.props;
    const isAdmin = managerMode && auth && admin.uid === auth.uid;

    return (
      <div className={classes.avatarContainer}>
        {isAdmin && <AdminIcon className={classes.adminIcon} />}
        <Avatar
          aria-label="Profile"
          src={admin.avatarUrl}
          alt={admin.displayName}
        />
      </div>
    );
  }

  get requestButton() {
    const { group: { id }, requestStatus, managerMode } = this.props;
    return (
      <GroupCardRequestButton
        groupId={id}
        requestStatus={requestStatus}
        disable={managerMode}
      />
    );
  }

  get infoAction() {
    const { publicInfo } = this.props.group;
    if (!publicInfo) {
      return null;
    }

    return (
      <div>
        <IconButton
          aria-label="Show information"
          onClick={e => this.handlePopoverClick(e, 'info')}
        >
          <InfoOutlineIcon />
        </IconButton>
        {this.getPopover('info', publicInfo)}
      </div>
    );
  }

  get pendingRequestsAction() {
    const { classes, group: { pendingRequests } } = this.props;

    if (pendingRequests < 1) {
      return null;
    }

    const popoverMessage = `
    ${pendingRequests} requests are pending
    validation by the creator of the group.
    `;
    return (
      <div>
        <IconButton
          aria-label="Show pending requests"
          onClick={e => this.handlePopoverClick(e, 'pendingRequests')}
        >
          <Badge
            className={classes.badge}
            badgeContent={pendingRequests}
            color="secondary"
          >
            <Icon>face</Icon>
          </Badge>
        </IconButton>
        {this.getPopover('pendingRequests', popoverMessage)}
      </div>
    );
  }

  get createdBy() {
    const { classes, group: { admin } } = this.props;
    return (
      <Typography
        variant="body1"
        color="textSecondary"
        className={classes.createdBy}
      >
        Created by {admin.displayName}
      </Typography>
    );
  }

  get title() {
    const {
      requestStatus,
      group: { id, departureStation, arrivalStation },
    } = this.props;
    const title = `${departureStation.name} to ${arrivalStation.name}`;
    if (requestStatus === 'confirmed' || requestStatus === 'admin') {
      return <Link to={`/group/${id}`}>{title}</Link>;
    }
    return title;
  }

  getPopover(type: string, content: string) {
    const { classes } = this.props;
    const { popover } = this.state;
    const popoverOpened = !!popover[type];
    return (
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={popoverOpened}
        anchorEl={popover[type]}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={e => this.handlePopoverClick(e, type)}
      >
        <Typography variant="body1">{content}</Typography>
      </Popover>
    );
  }

  getPopover: Function;
  handlePopoverClick: Function;

  handlePopoverClick(event, type) {
    event.persist();
    this.setState(state => ({
      popover: {
        [type]: state.popover[type] ? null : event.target,
      },
    }));
  }

  render() {
    const { classes, group: { dateTime, ticketUnits } } = this.props;
    const mDateTime = moment(dateTime);
    const fDate = mDateTime.format('MMM Do');
    const fTimeStart = mDateTime.format('ha');
    const fTimeEnd = mDateTime.add(1, 'h').format('ha');
    return (
      <Card>
        <CardHeader
          avatar={this.avatar}
          title={this.title}
          subheader={`${fDate}, ${fTimeStart} - ${fTimeEnd}`}
          action={this.requestButton}
          classes={{ title: classes.title }}
        />
        <CardContent classes={{ root: classes.cardContent }}>
          <TicketsProgess ticketUnits={ticketUnits} />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {this.infoAction}
          {this.pendingRequestsAction}
          {this.createdBy}
        </CardActions>
      </Card>
    );
  }
}

const styles = ({ typography, spacing }) => ({
  cardContent: {
    '&:last-child': {
      paddingBottom: spacing.unit * 2,
    },
  },
  title: {
    '& a': typography.body2,
    '& a:visited': typography.body2,
  },
  paper: {
    padding: spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  createdBy: {
    paddingRight: spacing.unit * 2 - 4,
    marginLeft: 'auto',
  },
  avatarContainer: {
    position: 'relative',
  },
  adminIcon: {
    color: '#FFFFFF',
    height: 20,
    width: 20,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
    top: -6,
    left: -6,
    background: amber[500],
    padding: 1,
  },
  pendingRequestsContainer: {
    backgroundColor: red[500],
    height: 20,
    width: 20,
    padding: 2,
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default withStyles(styles)(GroupCard);

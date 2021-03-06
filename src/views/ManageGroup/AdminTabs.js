// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import MembersIcon from 'material-ui-icons/Group';
import NewcomersIcon from 'material-ui-icons/GroupAdd';
import SettingsIcon from 'material-ui-icons/Settings';
import type { Member } from 'types/user';
import type { Group } from 'types/group';
import { updateGroup } from 'actions/groups';
import MembersTable from './MembersTable';
import NewcommersTable from './NewcommersTable';
import GroupPreferences from './GroupPreferences';

type Props = {
  classes: Object,
  pendingMembers: Member[],
  confirmedMembers: Member[],
  group: Group,
  dUpdateGroup: Function,
};

type State = {
  tabIdx: number,
};

class AdminTabs extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleSubmitPreferences = this.handleSubmitPreferences.bind(this);
  }

  state = {
    tabIdx: 0,
  };

  componentWillMount() {
    if (this.props.pendingMembers.length > 0) {
      this.handleChangeTab(1);
    }
  }

  get newcommersIcon() {
    const { classes, pendingMembers } = this.props;
    const pendingMembersCount = pendingMembers.length;
    if (pendingMembersCount > 0) {
      return (
        <Badge
          classes={{ badge: classes.badge }}
          badgeContent={pendingMembersCount}
        >
          <NewcomersIcon />
        </Badge>
      );
    }
    return <NewcomersIcon />;
  }

  handleChangeTab: Function;
  handleSubmitPreferences: Function;

  handleChangeTab(tabIdx: number) {
    this.setState({ tabIdx });
  }

  handleSubmitPreferences(values: Object) {
    const { group, dUpdateGroup } = this.props;
    const { public_info: publicInfo, private_info: privateInfo } = values;
    dUpdateGroup(group.id, { publicInfo, privateInfo });
  }

  render() {
    const { pendingMembers, confirmedMembers, group, classes } = this.props;
    const { tabIdx } = this.state;
    return (
      <div>
        <Tabs
          value={tabIdx}
          onChange={(e, idx) => this.handleChangeTab(idx)}
          centered
          fullWidth
          indicatorColor="secondary"
          textColor="primary"
        >
          <Tab
            classes={{ labelContainer: classes.labelContainer }}
            icon={<MembersIcon />}
            label="Members"
          />
          <Tab
            classes={{ labelContainer: classes.labelContainer }}
            icon={this.newcommersIcon}
            label="Newcommers"
            disabled={pendingMembers.length === 0}
          />
          <Tab
            classes={{ labelContainer: classes.labelContainer }}
            icon={<SettingsIcon />}
            label="Preferences"
          />
        </Tabs>
        {tabIdx === 0 && (
          <MembersTable isAdmin confirmedMembers={confirmedMembers} />
        )}
        {tabIdx === 1 && (
          <NewcommersTable
            pendingMembers={pendingMembers}
            changeTab={this.handleChangeTab}
          />
        )}
        {tabIdx === 2 &&
          group && (
            <GroupPreferences
              initialValues={{
                public_info: group.publicInfo,
                private_info: group.privateInfo,
              }}
              onSubmit={this.handleSubmitPreferences}
            />
          )}
      </div>
    );
  }
}

const styles = ({ breakpoints, palette }) => ({
  [breakpoints.down('xs')]: {
    labelContainer: {
      display: 'none',
    },
  },
  badge: {
    color: palette.secondary.dark,
  },
});

const mapDispatchToProps = {
  dUpdateGroup: updateGroup,
};

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(
  AdminTabs
);

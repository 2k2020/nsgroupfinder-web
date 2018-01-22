// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

type Props = {
  classes: Object,
  iconName: string,
  children: Node,
  onClick: Function,
};

const CreateGroupButton = ({
  classes,
  iconName,
  children,
  onClick,
  ...rest
}: Props): Node => (
  <Button
    className={classes.button}
    raised
    color="primary"
    onClick={onClick}
    {...rest}
  >
    {children}
    <Icon className={classes.rightIcon}>{iconName}</Icon>
  </Button>
);

CreateGroupButton.defaultProps = {};

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

export default withStyles(styles)(CreateGroupButton);

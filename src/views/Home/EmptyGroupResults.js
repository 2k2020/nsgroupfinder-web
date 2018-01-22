// @flow

import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { ButtonIcon } from 'common/components';

type Props = {
  classes: Object,
};

const EmptyGroupResults = ({ classes }: Props): Node => (
  <div className={classes.container}>
    <Typography
      type="subheading"
      align="center"
      headlineMapping={{ subheading: 'p' }}
      color="secondary"
    >
      No groups were found for these criteria..{' '}
      <span role="img" aria-label="Sad emojy">
        😔
      </span>
      <br />
      Create your own !{' '}
      <span role="img" aria-label="Sad emojy">
        💪
      </span>
    </Typography>
    <ButtonIcon iconName="add" component={Link} to="/create-group">
      Create a Group
    </ButtonIcon>
  </div>
);

EmptyGroupResults.defaultProps = {};

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: [[theme.spacing.unit * 5, 0]],
  },
});

export default withStyles(styles)(EmptyGroupResults);

// @flow

import React from 'react';
import type { Node } from 'react';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import { StationAutocomplete } from 'common/containers';
import { InputIconAdornment } from 'common/components';
import { TextField } from 'redux-form-material-ui';
import { validatorFactory } from 'utils/form';
import {
  required,
  date,
  numericality,
  addValidator,
} from 'redux-form-validators';

type Props = {
  classes: Object,
  handleSubmit: Function,
  pristine: boolean,
  submitting: boolean,
  change: Function,
};

const differentValidator = addValidator({
  validator: (options, value, allValues) => {
    const { field, fieldLabel } = options;
    const otherValue = allValues[field];
    if (value === otherValue) {
      return {
        id: 'form.errors.differentValidator',
        defaultMessage: 'must be different from "{fieldLabel}" field',
        values: { fieldLabel },
      };
    }
    return undefined;
  },
});

const GroupFilterForm = ({
  classes,
  handleSubmit,
  pristine,
  submitting,
  change,
}: Props): Node => (
  <form onSubmit={handleSubmit}>
    <Card className={classes.container}>
      <CardHeader title="Find your Journey Group" />
      <CardContent>
        <Grid container>
          <Grid item xs={12} className={classes.firstGridItem}>
            <div className={classes.stationsContainer}>
              <Field
                focused="true"
                id="departure"
                name="departure"
                component={StationAutocomplete}
                placeholder="Departure Station"
                iconName="train"
                change={change}
              />
              <Icon className={classes.stationArrowContainer}>
                arrow_forward
              </Icon>
              <Field
                id="arrival"
                name="arrival"
                component={StationAutocomplete}
                placeholder="Arrival Station"
                iconName="train"
                change={change}
              />
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          className={classes.dateTimeContainer}
        >
          <Grid item xs={12} sm={4}>
            <Field
              id="date"
              name="date"
              component={TextField}
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputIconAdornment color="secondary" iconName="date_range" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              id="start_time"
              name="start_time"
              component={TextField}
              label="Leave from"
              type="number"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <InputIconAdornment iconName="schedule" />,
                inputProps: {
                  min: '0',
                  max: '23',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              id="end_time"
              name="end_time"
              component={TextField}
              label="Leave until"
              type="number"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <InputIconAdornment iconName="schedule" />,
                inputProps: {
                  min: '0',
                  max: '23',
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" type="submit" disabled={pristine || submitting}>
          Search
        </Button>
      </CardActions>
    </Card>
  </form>
);

const styles = ({ spacing, breakpoints }) => ({
  container: {
    marginBottom: spacing.unit * 4,
  },
  stationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationTextFieldContainer: {
    background: 'grey',
  },
  stationArrowContainer: {
    display: 'none',
    padding: [[0, 20]],
    textAlign: 'center',
  },
  [breakpoints.up('sm')]: {
    stationsContainer: {
      flexDirection: 'row',
    },
    stationTextFieldContainer: {
      flex: [1, 1, 'auto'],
    },
    stationArrowContainer: {
      display: 'block',
      flex: [0, 0, 'auto'],
    },
  },
  firstGridItem: {
    paddingTop: [0, '!important'],
  },
  dateTimeContainer: {
    marginTop: spacing.unit * 2,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const formConfig = {
  form: 'groupFilter',
  initialValues: {
    date: moment()
      .add(2, 'day')
      .format('YYYY-MM-DD'),
    start_time: String(moment().hour()),
    end_time: String(
      moment()
        .add(1, 'hour')
        .hour()
    ),
  },
  validate: validatorFactory({
    departure: [required()],
    arrival: [required()],
    date: [required(), date({ format: 'yyyy-mm-dd' })],
    start_time: [required(), numericality({ '>=': 0, '<=': 23 })],
    end_time: [
      required(),
      numericality({ '>=': 0, '<=': 23 }),
      differentValidator({ field: 'start_time', fieldLabel: 'Leave from' }),
    ],
  }),
};

export default compose(withStyles(styles), reduxForm(formConfig))(
  GroupFilterForm
);

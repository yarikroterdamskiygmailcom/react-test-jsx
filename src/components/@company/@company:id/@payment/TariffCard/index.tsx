import React from 'react'
import { noop } from 'lodash'
import classNames from 'classnames'
import { Button, createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core'
import { globalStyles } from 'src/styles/global-styles'
import { Keys } from 'src/utils/Payment'

const styles = (theme: Theme) => createStyles({
  listItem: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 5}px `,
    margin: theme.spacing.unit,
    textAlign: 'center',
    listStyle: 'none',
    width: `calc(33.3% - ${theme.spacing.unit * 2}px)`,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: 450,
    },
    '&.disabled': {
      cursor: 'not-allowed',
    }
  },
  animateOutIn: {
    ...globalStyles.animateOutIn,
  },
  animateInOut: {
    ...globalStyles.animateInOut,
  },
  title: {
    fontSize: 28,
    fontWeight: 500,
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit,
  },
  subtitle: {
    height: 28,
    maxWidth: 300,
    margin: '10px auto',
    backgroundColor: '#54da8d',
    borderRadius: theme.spacing.unit,
  },
  subtitle1: {
    fontSize: 16,
    color: 'white',
    fontWeight: 700,
  },
  priceBlock: {
    height: 60,
    position: 'relative',
  },
  price: {
    right: '30%',
    position: 'absolute',
    color: '#3dc19b',
    fontSize: theme.typography.fontSize * 2,
    marginBottom: 0,
    lineHeight: 1,
  },
  oldPrice: {
    right: '30%',
    position: 'absolute',
    color: '#3dc19b',
    fontSize: theme.typography.fontSize * 2,
    marginBottom: 0,
    lineHeight: 1,
  },
  priceNumber: {
    fontSize: theme.typography.fontSize * 4,
  },
  priceValue: {
    alignSelf: 'center',
    fontSize: theme.typography.fontSize * 2,
  },
  priceSign: {
    left: '25%',
    position: 'absolute',
    fontSize: 16.8,
    color: '#a1a1a1',
    display: 'block',
    marginBottom: theme.spacing.unit * 2,
  },
  oldPriceSign: {
    left: '25%',
    position: 'absolute',
    fontSize: 16.8,
    color: '#a1a1a1',
    display: 'block',
    marginBottom: theme.spacing.unit * 2,
  },
  priceSignBlock: {
    position: 'relative',
    height: 45,
  },
  innerList: {
    textAlign: 'left',
    maxWidth: '200%',
    width: 'calc(100% + 20px)',
    marginLeft: -theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2,
  },
  innerListItem: {
    lineHeight: 1.8,
    listStyle: 'none',
    position: 'relative',
    paddingLeft: theme.spacing.unit * 2,
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: theme.spacing.unit,
      borderRadius: '50%',
      width: theme.spacing.unit,
      height: theme.spacing.unit,
      backgroundColor: '#1ce39a',
      backgroundImage: 'linear-gradient(-130deg, #57de8b 0%, #50a9d2 100%)',
    },
    '&.inactive': {
      textDecoration: 'line-through',
      opacity: 0.3,
      '&:before': {
        width: 0,
        height: 0,
      },
    },
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
})

type Advantage = {
  active: boolean,
  text: string,
}

interface Props extends WithStyles<typeof styles> {
  tariff: {
    _id: string,
    name: string,
    prices: Keys,
    advantages: Advantage[],
    isActive: boolean,
  }
  isFavourite?: boolean,
  pay: (tariffType: string, tariffId: string, tariffSum: number, tariffTerm: string) => () => void,
}

const TariffCard = ({
  pay,
  classes,
  isFavourite,
  tariff: { _id, name, prices: { month, year, monthByYear, oldMonth, oldMonthByYear, }, advantages, isActive },
}: Props) => (
  <li className={classNames(classes.listItem, { disabled: isActive })}>
    {isFavourite && (
      <div className={classes.subtitle}>
        <Typography variant="subtitle1" className={classes.subtitle1}>Выбирают 67% предпринимателей</Typography>
      </div>
    )}
    <Typography variant="subtitle2" className={classes.title}>{name}</Typography>
    <div className={classes.priceBlock}>
      <span className={classNames(classes.oldPrice, { [classes.animateOutIn]: oldMonthByYear !== monthByYear })}>
          <span className={classes.priceNumber}>{oldMonthByYear}</span>
          <span className={classes.priceValue}>$</span>/мес
      </span>
      <span className={classNames(classes.price, { [classes.animateInOut]: oldMonthByYear !== monthByYear })}>
          <span className={classes.priceNumber}>{monthByYear}</span>
          <span className={classes.priceValue}>$</span>/мес
     </span>
    </div>
    <div className={classes.priceSignBlock}>
      <span className={classNames(classes.oldPriceSign, { [classes.animateOutIn]: oldMonth !== month })}>
        при оплате за год
      <br />
        {oldMonth} $/мес ежемесячно
      </span>
      <span className={classNames(classes.priceSign, { [classes.animateInOut]: oldMonth !== month })}>
        при оплате за год
      <br />
        {month} $/мес ежемесячно
      </span>
    </div>
    <ul className={classes.innerList}>
      {advantages.map((item, idx) => (
        <li
          key={idx}
          className={classNames(classes.innerListItem, { inactive: !item.active })}
        >
          <Typography variant="subtitle1" className={classes.text}>{item.text}</Typography>
        </li>
      ))}
    </ul>
    <Button
      fullWidth
      disabled={isActive}
      className={classes.button}
      onClick={pay(name, _id, year, 'year')}
    >
      Годовая подписка
    </Button>
    <Button
      fullWidth
      disabled={isActive}
      className={classes.button}
      onClick={pay(name, _id, month, 'month')}
    >
      Месячная подписка
    </Button>
  </li>
)

TariffCard.defautlProps = {
  tariff: {},
  advantages: [],
  pay: noop,
  isFavourite: false,
}

export default withStyles(styles)(TariffCard)

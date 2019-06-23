import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import { Avatar, Button, Card, createStyles, IconButton, Typography, withStyles, WithStyles } from '@material-ui/core'
import ABC from 'src/assets/images/Block-ABC.png'
import ABCDisable from 'src/assets/images/Block-ABC-disable.png'
import City from 'src/assets/images/City.png'
import { MIN_DAYS_LEFT } from 'src/constants'
import CloseIcon from 'mdi-react/CloseIcon'

const styles = createStyles({
  root: {
    height: 435,
    width: '100%',
    color: '#9a9a9a',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  disabledCard: {
    background: '#fafcfd',
    boxShadow: 'none',
  },
  closeButton: {
    alignSelf: 'flex-end',
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
    },
  },
  title: {
    marginTop: -10,
  },
  tariffBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    width: 200,
  },
  buttonMuffled: {
    color: 'white',
    background: 'linear-gradient(to bottom, rgba(87,222,139,0.5) 0%, rgba(22,149,178,0.5) 100%)',
  },
  buttonDisabled: {
    color: 'white',
    background: '#cee4f2',
  },
  tariff: {
    fontWeight: 600,
  },
  daysLeft: {
    marginTop: 5,
    marginBottom: 20,
  },
  icon: {
    width: 123,
    height: 115,
    marginTop: 35,
    marginBottom: 30,
    borderRadius: 0,
  },
})

interface Props extends WithStyles<typeof styles> {
  name: string,
  tariff: string,
  daysLeft: number,
  isDemoCompany: boolean,
  onOpenCompany: () => void,
  onDelete: (e: MouseEvent<HTMLButtonElement>) => Promise<void>,
  onChangeTariff: (e: MouseEvent<HTMLButtonElement>) => Promise<void>,
}

const CompanyCard = ({ classes, name, tariff, daysLeft, isDemoCompany, onOpenCompany, onDelete, onChangeTariff }: Props) => {
  const disabled = daysLeft <= 0
  const size = 15

  return (
    <Card
      elevation={0}
      onClick={onOpenCompany}
      className={classes.root}
      style={disabled ? styles.disabledCard : undefined}
    >
      <IconButton className={classes.closeButton} onClick={onDelete}>
        <CloseIcon size={size} />
      </IconButton>

      <Typography variant="subtitle2" align="center" className={classes.title}>{name}</Typography>

      <Avatar alt="image" src={disabled ? ABCDisable : (isDemoCompany ? ABC : City)} className={classes.icon} />

      <div className={classes.tariffBlock}>
        <Typography variant="subtitle1">Тариф:&nbsp;</Typography>
        <Typography variant="subtitle1" className={classes.tariff}>{tariff}</Typography>
      </div>
      <Typography
        variant="subtitle1"
        className={classes.daysLeft}
        color={!disabled ? (daysLeft <= MIN_DAYS_LEFT ? 'error' : 'primary') : 'inherit'}
      >
        Осталось дней: {daysLeft <= 0 ? 0 : daysLeft}
      </Typography>

      {!isDemoCompany && (
        <Button
          onClick={onChangeTariff}
          className={classNames(
            classes.button,
            {
              [classes.buttonDisabled]: disabled,
              [classes.buttonMuffled]: tariff === 'Предприниматель',
            },
          )}
        >
          {(daysLeft <= 0 && tariff === 'Тестовый') ? 'Оплатить' : 'Сменить тариф'}
        </Button>)}
    </Card>
  )
}

export default withStyles(styles)(CompanyCard)

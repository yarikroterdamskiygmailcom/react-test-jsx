import React, { MouseEvent } from 'react'
import { createStyles, Menu, MenuItem, WithStyles, withStyles } from '@material-ui/core'
import { Company } from 'src/redux/app/company/types'
import { User } from 'src/redux/app/auth/types'

const styles = createStyles({
  menuItem: {
    '&:focus': {
      outline: 'none',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  user: User | null,
  company: Company | null,
  anchorEl: HTMLElement | null,
  onLogout: () => void,
  onOpenAPI: () => void,
  onOpenUnloading: () => void,
  onChooseCompany: () => void,
  onChoosePassword: () => void,
  onCloseMenu: (event: MouseEvent<HTMLDivElement>) => void,
}

const UserMenu = ({
  classes,
  user,
  company,
  anchorEl,
  onLogout,
  onOpenAPI,
  onCloseMenu,
  onChooseCompany,
  onOpenUnloading,
  onChoosePassword,
}: Props) => (
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onCloseMenu}>

    <div className={classes.menuItem} onClick={onCloseMenu}>
      <MenuItem onClick={onChooseCompany}>Выбор компании</MenuItem>
      <MenuItem onClick={onChoosePassword}>Смена пароля</MenuItem>
      {company && <MenuItem onClick={onOpenAPI}>API</MenuItem>}
      {company && <MenuItem onClick={onOpenUnloading}>Выгрузка</MenuItem>}
      {user && <MenuItem onClick={onLogout}>Выйти</MenuItem>}
    </div>
  </Menu>
)

export default withStyles(styles)(UserMenu)

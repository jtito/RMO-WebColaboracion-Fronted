'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { useSession } from 'next-auth/react'

import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  const { data: session, status } = useSession()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const isAdmin = session?.user?.role === 1

  console.log('session', session)
  console.log('isAdmin', isAdmin)

  if (status === 'loading') {
    // Puedes mostrar un spinner de carga aquí si lo deseas
    return <div>Cargando...</div>
  }

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuSection label={dictionary['navigation'].Colaboracion}>
          {isAdmin ? (
            <MenuItem href={`/${locale}/apps/user/list`} icon={<i className='tabler-user' />}>
              {dictionary['navigation'].GestionUsuario}
            </MenuItem>
          ) : (
            <>
              <MenuItem href={`/${locale}/Colaboraciones/publicaciones`} icon={<i className='tabler-smart-home' />}>
                {dictionary['navigation'].Publicacion}
              </MenuItem>

              <SubMenu label={dictionary['navigation'].GestiónPublicación} icon={<i className='tabler-checkup-list' />}>
                <MenuItem href={`/${locale}/Colaboraciones/GestionPublicaciones/publicados`}>
                  {dictionary['navigation'].Publicados}
                </MenuItem>
                <MenuItem href={`/${locale}/Colaboraciones/GestionPublicaciones/borradores`}>
                  {dictionary['navigation'].Borradores}
                </MenuItem>
              </SubMenu>
            </>
          )}
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu

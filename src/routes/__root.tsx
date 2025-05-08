import MobileNav from '@/components/MobileNav'
import SideBar from '@/components/SideBar';
import { ThemeProvider } from '@/components/theme-provider'
import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => {
    const matchRoute = useMatchRoute();
    const isLoginRoute = matchRoute({ to: '/sign-in' });
    const isSignUpRoute = matchRoute({ to: '/sign-up' });

    return(
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/signUp" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr /> */}
      <ThemeProvider defaultTheme='light'  storageKey="vite-ui-theme" >
        <div className='poppins-regular lg:flex'>
         <SideBar/>
         <div className='flex-1'>
          <Outlet />

         </div>
          {!isLoginRoute && !isSignUpRoute &&  <MobileNav/>}
         
        </div>
      </ThemeProvider>
      {/* <TanStackRouterDevtools /> */}
    </>

    )
},
})
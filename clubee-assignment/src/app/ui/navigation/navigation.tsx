'use client'
 
import { usePathname } from 'next/navigation'

// import styles from './navigation.module.scss';
// import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Link from 'next/link';
 
export function Navigation({ navLinks }: { navLinks: any[] }) {
  const pathname = usePathname()
 
  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <IconButton 
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AddReactionIcon />
            </IconButton>
          </Link>
          <Link href="/articles">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Articles
            </Typography>
          </Link>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </nav>


  )
}
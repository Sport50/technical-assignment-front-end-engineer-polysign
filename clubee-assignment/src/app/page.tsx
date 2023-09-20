import { Card } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <div>
      <Typography variant="h3" gutterBottom>Home</Typography>
      <Typography variant="body1" gutterBottom>Hi, my name is Georges. I am a software developer with +15 years of experience.</Typography>

      <Typography variant="h6" gutterBottom marginTop={6}>Setup this project:</Typography>
      <Card>
        <List>
          <ListItem>
            <ListItemText primary="SQLite Database" secondary="Run the following script inside the 'clubee-assignment' folder: node dbsetup.js" />
          </ListItem>
        </List>
      </Card>

      <Typography variant="h6" gutterBottom marginTop={6}>What I would have done if I had more time:</Typography>
      <Card>
        <List>
          <ListItem>
            <ListItemText primary="Validations" secondary="Adding validations / more error handling" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Material UI" secondary="Make sure to only use Material UI components (I did some custom css)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mobile" secondary="Improved mobile responsiveness" />
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

/**
 * @Dependencies
 */
import React from 'react';
import './App.css';
import { styles } from '../styles';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import InfoIcon from '@material-ui/icons/Info';
import MenuAppBar from './navbar/navbar.component';

/**
 * App is an abstract base class. It is defined simply
 * to have a users searcher
 * @constructor
 */
class App extends React.Component {
  /** 
   * @constructor 
   * @Params props: React props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      expanded: false,
      shown: {},
      people: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);

   /**
    * @Call Random User API
    */
    axios.get('https://randomuser.me/api/?results=36')
    .then((response) => {
      this.setState({ people: response.data.results })
    });
  }


  /** 
   * @handleExpandClick
   * Expand / Collapse items
   */
  handleExpandClick(index) {
    this.setState({
         shown: {
             [index]: !this.state.shown[index]
         }
     });
  }

  /** 
   * @handleChange
   * Set state for username search results
   * @Params event: $event
   */
  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  /** 
   * @render
   * React render
   */
  render() {
   /** 
    * @Match results
    * Displays matched results
    */
    let libraries = this.state.people;
    let searchString = this.state.username.trim().toLowerCase();
    if (searchString.length > 0) {
      libraries = libraries.filter(function(i) {
        return i.name.first.toLowerCase().match( searchString );
      });
    }

    /** 
     * @return
     * Renders return
     */
    return (
      <div className="App">
        <header className="App-header">
          <MenuAppBar />
        </header>
        <form noValidate autoComplete="off">
          <TextField
            className="searcher"
            id="standard-name"
            label="Search users"
            placeholder="First name"
            onChange={this.handleChange}
            margin="normal"
          />
        </form>
        { libraries &&
          libraries.map((people, index) => 
          <Card className="fix-card">
            <CardHeader
              avatar={
                <Avatar alt={people.name.first} src={people.picture.large} />
              }
              action={
                <IconButton
                  onClick={() => this.handleExpandClick(index)} 
                  aria-expanded={this.state.shown[index]}
                  aria-label="Show more"
                >
                  <InfoIcon />
                </IconButton>
              }
              title={people.name.first + ' ' + people.name.last}
              subheader={'. ' + people.dob.age + ' years old.'}
            />
            <CardActions disableActionSpacing />
            <Collapse in={this.state.shown[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="subtitle2">
                  My email is 
                  <strong>&nbsp;{people.email}.</strong>
                </Typography>
                <Typography variant="subtitle2">
                  &nbsp;I live in
                  <strong>&nbsp;{people.location.street}&nbsp;</strong>
                  street,
                </Typography>
                  <Typography variant="subtitle2">
                  <strong>&nbsp;{people.location.city}.</strong>
                </Typography>
                <Typography variant="subtitle2">
                  &nbsp;My phone number is 
                  <strong>&nbsp;{people.phone}</strong>.
                </Typography>
              </CardContent>
            </Collapse>
            <hr />
          </Card>
          )
        }
      </div>
    );
  }
}
export default withStyles(styles)(App);

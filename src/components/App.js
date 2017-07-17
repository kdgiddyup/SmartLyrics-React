import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../App.css'
import Root from "./Root"
import Header from "./common/Header"
import Footer from "./common/Footer"
import MenuBtns from "./common/MenuBtns"
import AuthModal from "./common/modals/AuthModal"
import Search from "./Search"
import Favorites from "./Favorites"

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
      greeting: "Welcome! Log in or create account to get started."
      };
  // bind update greeting and user methods since we'll use it deeper in the tree
  this.updateGreeting = this.updateGreeting.bind(this);  
  this.updateUser = this.updateUser.bind(this);
}  

  componentDidMount(){
    // return currentUser in local storage, or false: 
    // first, does the browser support local storage?
    if (typeof(Storage) !== "undefined") {
        // try to retrieve any current user stored from previous log-in        
        if (localStorage.getItem("sl_user")) {
            var user = localStorage.getItem("sl_user");
            this.setState({ 
              user: user,
              greeting: `Welcome, ${user}!` 
            },()=>{
              console.log("User set to:",this.state.user)
            })
        }
    }
      else {
          console.log("No local storage supported");
          this.setState({ user: false });
    }
  }

  updateUser = (user) => {
    console.log(`Updating with user ${user}`)
    this.setState({
      user: user
    })
  }

  updateGreeting = (greeting) => {
    this.setState(
      {
        greeting:greeting
      }
    )
  }

  // needed to construct these  functions to 1) pass the user into <Search> component since it's being called by <Route> and 2) conditionally render MenuBtns only if user is logged in

  Search = ({props}) => {
    return (
      <Search user={this.state.user} term={false} {...props}/>
    )
  }
  ParamSearch = ({match} ) => {
    return (
      <Search user={this.state.user} term={match.params.term}/>
    )
  }

  RenderMenu = () => {
    return (
      (!this.state.user) ? null : <MenuBtns/> 
    )
  }

  GetFavorites = () => {
    return (
      <Favorites user={this.state.user}/> 
    )
  }

  

  render() {
    return (
      <Router>
        <Root>
          <Route exact path="/demos/smartlyrics" component={Root}/>
          {/* render header and send the modal render method as a property */}
           <Header user={this.state.user} updateUser={this.updateUser} greeting={this.state.greeting} />
           <Footer/> 
           
            {/* Modal will render but not be visible until triggered programmatically; we send as props our user, if any, and a method for updating user's name */}
            <AuthModal user={this.state.user} updateUser={this.updateUser} updateGreeting={this.updateGreeting}/>   
            
            {/* use a function to determine if search/favorite buttons should render */}
            {this.RenderMenu()}
            
            {/* routes matching our <Links> around buttons at <MenuBtns> */}
              <Route path="/search/:term" render={this.ParamSearch}/>
              <Route exact path="/search" render={this.Search}/>
              <Route path="/favorites" render={this.GetFavorites}/>

            
                  
        </Root>
      </Router>
    );
  }
}

export default App;

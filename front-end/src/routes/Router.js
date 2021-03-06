import React from 'react';
import { Switch , Route, HashRouter } from 'react-router-dom';
import MainLayoutContainer from '../containers/MainLayoutContainer';
import HomeRoute from './HomeRoute';
import RestrictRoute from './RestrictRoute';
import PrivateRoute from './PrivateRoute';

import NotFound from '../components/Error/NotFound';
import loadable from '@loadable/component';

const AsyncLoginForm = loadable(() => import('../containers/LoginContainer'));
const AsyncRegisterForm = loadable(() => import('../containers/RegisterContainer'));
const AsyncHome = loadable(() => import('../containers/HomeContainer'));
const AsyncPosts = loadable(() => import('../containers/PostsContainer'));
const AsyncPost = loadable(() => import('../containers/PostContainer'));
const AsyncChat = loadable(() => import('../containers/ChatboxContainer'));

function Router() {
  return (    
    <React.Fragment>
      <HashRouter>
        <Switch>
          <HomeRoute exact path="/" component={AsyncHome} layout={MainLayoutContainer}/>
          <RestrictRoute path="/login" component={AsyncLoginForm} />
          <RestrictRoute path="/register" component={AsyncRegisterForm} />
          <PrivateRoute exact path="/posts" component={AsyncPosts} layout={MainLayoutContainer}/>
          <PrivateRoute path="/posts/write" component={AsyncPost} layout={MainLayoutContainer}/>
          <PrivateRoute path="/posts/:id/edit" component={AsyncPost} layout={MainLayoutContainer}/>
          <PrivateRoute exact path="/posts/:id" component={AsyncPost} layout={MainLayoutContainer}/>
          <PrivateRoute exact path="/chat/socket.io" component={AsyncChat} layout={MainLayoutContainer}/>
          <Route path="/logout" />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default Router;



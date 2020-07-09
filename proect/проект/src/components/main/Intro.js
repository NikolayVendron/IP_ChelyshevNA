import React from 'react';
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export const Intro = () => {
  return (
      <div className={'Intro'}>
          <div className="Intro__text">
              <h1>Furniture <span>shop</span></h1>
              <NavLink to={'/catalog'} exact>
                  <Button variant={'primary'}>Go</Button>
              </NavLink>
          </div>
      </div>
  )
};
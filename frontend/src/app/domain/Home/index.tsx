import React from 'react';
import { Main } from '../../components/Main';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export class Home extends React.Component {
  render(): JSX.Element {
    return (
      <>
        <Navbar />
        <Main>
          <p>Hello, World!</p>
        </Main>
        <Footer />
      </>
    );
  }
}

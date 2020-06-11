import React from 'react';
import { Footer } from '../../components/Footer';
import { Main } from '../../components/Main';
import { Navbar } from '../../components/Navbar';

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

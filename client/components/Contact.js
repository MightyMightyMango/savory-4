import React from 'react'
import styled from 'styled-components'
import Container from '../theme/Container'

const Contact = props => {
  return (
    <Container primary>
      <h2>
        Want to get in touch? Contact us at{' '}
        <ContactLink>
          <a href="mailto:savory2021@gmail.com">savory2021@gmail.com</a>!
        </ContactLink>
      </h2>
      <h2>About Us:</h2>
      <Profiles>
        <Profile>
          <img className="profile-pics" src="/images/profile/ellen-crop.png" />
          <h3>Ellen Granoff</h3>
          <p>
            <a href="https://www.linkedin.com/in/ellengranoff/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
        </Profile>
        <Profile>
          <img className="profile-pics" src="/images/profile/lea-crop.png" />
          <h3>Lea Overend</h3>
          <p>
            <a href="https://www.linkedin.com/in/lea-overend/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
        </Profile>
        <Profile>
          <img
            className="profile-pics"
            src="/images/profile/micheline-crop.png"
          />
          <h3>Micheline Wu</h3>
          <p>
            <a href="https://www.linkedin.com/in/micheline-wu/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
        </Profile>
      </Profiles>
    </Container>
  )
}

export default Contact

const ContactLink = styled.div`
  a {
    color: black;
    text-decoration: underline;
    text-underline-position: under;
  }

  a:hover {
    text-decoration: none;
  }
`

const Profiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;

  .profile-pics {
    border-radius: 50%;
  }

  a {
    color: black;
    text-decoration: underline;
    text-underline-position: under;
  }

  a:hover {
    color: black;
    text-decoration: none;
  }
`
const Profile = styled.div`
  padding: 20px;
`

<template>
    <div class="about-us">
      <h1>About Us</h1>
      <p>We are a dynamic duo of computer engineers passionate about creating innovative software solutions.</p>
      <h2>Our Team</h2>
      <div class="team-members">
        <div v-for="member in teamMembers" :key="member.name" class="team-member">
          <h3>{{ member.name }}</h3>
          <ul>
            <li>{{ member.role }}</li>
            <li>{{ member.specialization }}</li>
            <li>
              <a :href="member.linkedin" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin"></i> LinkedIn
              </a>
            </li>
            <li>
              <a :href="member.github" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> GitHub
              </a>
            </li>
            <li>
              <a :href="'mailto:' + member.email">
                <i class="fas fa-envelope"></i> {{ member.email }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <footer>
        <p>&copy; {{ currentYear }} {{ companyName }}. All rights reserved.</p>
      </footer>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'AboutUs',
    data() {
      return {
        teamMembers: [
          {
            name: 'Veysel ÖZDEMİR',
            role: 'Computer Engineering',
            specialization: 'Backend Developer',
            linkedin: 'https://www.linkedin.com/in/ozdemir-veysel/',
            github: 'https://github.com/veysel-ozdemir',
            email: 'veysel2002tr@gmail.com'
          },
          {
            name: 'Sevgi Nur Kara',
            role: 'Computer Engineering',
            specialization: 'Frontend Developer',
            linkedin: 'https://www.linkedin.com/in/sevgi-nur-kara',
            github: 'https://github.com/SevgiNurKARA',
            email: 'sevginurkara2002@gmail.com'
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .about-us {
    width: 1500px;
    height: 650px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #BC8B68;
  }
  
  h1, h2 {
    color: #422B1C;
    margin-bottom: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5em;
    border-bottom: 3px solid #422B1C;
    padding-bottom: 10px;
  }
  
  h2 {
    font-size: 2em;
    color: #422B1C;
  }
  
  p {
    margin-bottom: 20px;
    text-align: center;
    
  }
  
  .team-members {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 1400px;
    margin-left: 25px;
    margin-right: 25px;
    gap: 20px;
    border-color: 1px solid #422B1C;
  }
  
  .team-member {
    background-color: #F1D5AA;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-radius: 50px;
    width: calc(50% - 40px); /* 2 columns layout */
  }
  
  .team-member h3 {
    color: #422B1C;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .team-member a {
    display: flex;
    align-items: center;
    color: #8F6544;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .team-member a:hover {
    color: #422B1C;
    text-decoration: underline;
  }
  
  .team-member i {
    margin-right: 10px;
    font-size: 1.2em;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    color: #8F6544;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #2c3e50;
    text-decoration: underline;
  }
  
  footer {
    margin-top: 50px;
    text-align: center;
    color: #422B1C;
  }
  
  
  </style>
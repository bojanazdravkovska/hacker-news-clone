<template>
    <nav class="sidebar">
      <h2>Search Hacker News</h2>
      <ul>
        <li><router-link to="/">All</router-link></li>
        <li><router-link to="/hot">Hot</router-link></li>
        <li><router-link to="/showHN">Show HN</router-link></li>
        <li><router-link to="/askHN">Ask HN</router-link></li>
        <li><router-link to="/polls">Polls</router-link></li>
        <li><router-link to="/jobs">Jobs</router-link></li>
        <li><router-link to="/shipow">Shipow</router-link></li>
        <li><router-link to="/starred">Starred</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 10px;
    border-right: 1px solid #ddd; 
    height: 100vh; 
    position: fixed; 
    top: 0;
    left: 0;
  }
  
  .sidebar h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin: 10px 0;
  }
  
  .sidebar ul li a {
    text-decoration: none;
    color: #333;
  }
  </style>
  
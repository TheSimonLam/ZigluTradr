# ZigluTradr - Tech Test 🎉

Tech Test for Ziglu created by Simon Lam.

Built in Node v14.16.1 LTS using Create React App + React Context API

To run the project, type `npm start`

<img src="https://github.com/TheSimonLam/ZigluTradr/blob/master/src/assets/demo.PNG?raw=true"/>

### Afterthoughts

The test cases I'd write for this would be TDD.
I would use Jest and Enzyme to test React Components for their expected outputs/behaviors. Enzyme allows shallow and deep rendering of a React component with state and props whereas react-testing-library tests via. DOM giving us less control.

If the program were to get more complex, I'd opt for React Redux as a framework. React Context API has performance limitations wherein any component wrapped inside the provider would refresh.

As for error states, I would implement a global error logger. This may include an error toast popup describing to the user what's broken. I would also implement either BugSnag or Elastic RUM (Real User Monitoring) for Prod/Live bug reporting using source maps
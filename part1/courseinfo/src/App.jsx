const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.part} {props.total}
      </p>
    </div>
  )
}

const Content = (props) => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  console.log(props)
  return (
    <div>
      <Part part={part1} total={exercises1}/>
      <Part part={part2} total={exercises2}/>
      <Part part={part3} total={exercises3}/>
    </div>
  )
}

// const Total = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <p>
//         {props.total}
//       </p>
//     </div>
//   )
// }

const App = () => {
  const course = 'Half Stack application development'
  return (
    <div>
      <Header name={course}/>
      <Content/>
    </div>
  )
}

export default App
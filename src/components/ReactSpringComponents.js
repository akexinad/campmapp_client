<Transition
  native
  items={ this.state.showLoginForm }
  from={{ opacity: 0 }}
  enter={{ opacity: 1 }}
  leave={{ opacity: 0 }}
>
  { show => show && (props => (
    <animated.div style={props}>



    </animated.div>
  ))}
</Transition>

<Spring
  from={{
    opacity: 0,
    marginTop: -500
  }}
  to={{
    opacity: 1,
    marginTop: 0
  }}
>
  { props => (
    <div style={ props }>


    </div>
  ) }
</Spring>

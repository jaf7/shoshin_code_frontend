import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setExerciseId, setExerciseSlug, getSessionContent, removeExerciseFromCollection } from '../../actions/actions'

import { ListItem, Button } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'

const styles = {
  wrapper: { 'display':'flex', 'justifyContent':'spaceBetween' },
  savedSessions: { listStyle: 'none', marginTop: '1rem' },
  listItem: { 'overflow':'hidden' }
}

class ExerciseListItem extends Component {

  componentWillReceiveProps( nextProps ) {
    if ( this.props.exerciseCollection !== nextProps.exerciseCollection ) {
    }
  }

  loadExercise = () => {
    if ( this.props.exercise.slug ) {
      this.props.setExerciseId(this.props.exercise.id)
      this.props.setExerciseSlug(this.props.exercise.slug)
      this.props.getSessionContent(this.props.userId, this.props.exercise.id)
      this.props.history.replace(`/exercise/${this.props.exercise.slug}`)
    } else {
      console.log('&&&&&&& No slug &&&&&&&&')
    }
  }

  removeExercise = () => {
    this.props.removeFromCollection( this.props.userId, this.props.exercise.id )
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <Button onClick={this.removeExercise} icon iconEl={<MaterialIcon icon="delete" color={colorPallet.blueGrey._500}/>}></Button>
        <ListItem
          primaryText={ this.props.exercise.name.length > 24 ? '>_ ' + this.props.exercise.name.substring(0,23) + '...' : '>_ ' + this.props.exercise.name }
          activeBoxStyle={styles.savedSessions}
          style={styles.listItem}
          onClick={this.loadExercise}
          />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.id,
    exercise: ownProps.exercise,
    exerciseCollection: state.user.exerciseCollection
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setExerciseId: setExerciseId,
    setExerciseSlug: setExerciseSlug,
    getSessionContent: getSessionContent,
    removeFromCollection: removeExerciseFromCollection
  }, dispatch)
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( ExerciseListItem ) )
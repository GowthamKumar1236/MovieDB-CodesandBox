import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  onNext = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPages) {
          return {
            pageNo: prevState.pageNo + 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  onPrevious = () => {
    const {apiCallback} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo > 1) {
          return {
            pageNo: prevState.pageNo - 1,
          }
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallback(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    const {totalPages} = this.props

    return (
      <div className="page-alignment">
        <button
          type="button"
          className="navigate-buttons"
          onClick={this.onPrevious}
          disabled={pageNo === 1}
        >
          Prev
        </button>
        <p className="page-no-text">{pageNo}</p>
        <button
          type="button"
          className="navigate-buttons"
          onClick={this.onNext}
          disabled={pageNo === totalPages}
        >
          Next
        </button>
      </div>
    )
  }
}

export default Pagination

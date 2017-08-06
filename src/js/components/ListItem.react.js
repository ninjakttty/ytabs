import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'
import { removeItem } from '../storage'

const CloseButton = (data) => {
  const { favIconUrl, id } = data
  // console.log('data', data)
  const removeThis = removeItem(id)
  return (
    <Button icon onClick={removeThis} circular size='mini' compact basic>
      <Icon name="remove" color='red' />
    </Button>)
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    // this.saveAll = this.saveAll.bind(this)
  }
  render() {
    const { url, favIconUrl, title } = this.props
    //
    // console.log('LI', this.props)
    return (
      <div style={{ marginBottom: '10px' }}>
        <CloseButton {...this.props} />
        <Image src={favIconUrl} height={14} inline style={{ margin: '0 8px' }} />
        {title}
        <p style={{ fontSize: '12px' }}>
          {url}
        </p>
      </div>
    )
  }
}
/*
        <Image src={favIconUrl} alt={url} size='mini' />

*/

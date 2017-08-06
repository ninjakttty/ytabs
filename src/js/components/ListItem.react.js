import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'
import { removeItem, openLink } from '../storage'

const CloseButton = data => {
  const { favIconUrl, id } = data
  const removeThis = e => {
    e.stopPropagation()
    removeItem(id)
  }

  return (
    <Button icon onClick={removeThis} circular size="mini" compact basic>
      <Icon name="remove" color="red" />
    </Button>
  )
}

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { url, favIconUrl, title } = this.props
    const openThis = () => openLink(url)

    return (
      <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={openThis}>
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

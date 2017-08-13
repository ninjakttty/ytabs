import dateformat from 'dateformat'

const titleDate = date => dateformat(date, 'ddd, mmmm dS h:MM:ss TT')

export { titleDate }

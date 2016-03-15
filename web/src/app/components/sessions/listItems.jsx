var React = require('react');
var { Link } = require('react-router');
var {actions} = require('app/modules/sessions');
var {nodeHostNameByServerId} = require('app/modules/nodes/getters');
var {Cell, TextCell} = require('app/components/table.jsx');
var moment =  require('moment');

const DateCreatedCell = ({ rowIndex, data, ...props }) => {
  let created = data[rowIndex].created;
  let displayDate = moment(created).format('l LTS');
  return (
    <Cell {...props}>
      { displayDate }
    </Cell>
  )
};

const DurationCell = ({ rowIndex, data, ...props }) => {
  let created = data[rowIndex].created;
  let lastActive = data[rowIndex].lastActive;

  let end = moment(created);
  let now = moment(lastActive);
  let duration = moment.duration(now.diff(end));
  let displayDate = duration.humanize();

  return (
    <Cell {...props}>
      { displayDate }
    </Cell>
  )
};

const SingleUserCell = ({ rowIndex, data, ...props }) => {
  return (
    <Cell {...props}>
      <span className="grv-sessions-user label label-default">{data[rowIndex].login}</span>
    </Cell>
  )
};

const UsersCell = ({ rowIndex, data, ...props }) => {
  let $users = data[rowIndex].parties.map((item, itemIndex)=>
    (<span key={itemIndex} className="grv-sessions-user label label-default">{item.user}</span>)
  )

  return (
    <Cell {...props}>
      <div>
        {$users}
      </div>
    </Cell>
  )
};

const ButtonCell = ({ rowIndex, data, ...props }) => {
  let { sessionUrl, active } = data[rowIndex];
  let [actionText, actionClass] = active ? ['join', 'btn-warning'] : ['play', 'btn-primary'];
  return (
    <Cell {...props}>
      <Link to={sessionUrl} className={"btn " +actionClass+ " btn-xs"} type="button">{actionText}</Link>
    </Cell>
  )
}

const EmptyList = ({text}) => (
  <div className="grv-sessions-empty text-center text-muted"><span>{text}</span></div>
)

const NodeCell = ({ rowIndex, data, ...props }) => {
  let {serverId} = data[rowIndex];
  let hostname = reactor.evaluate(nodeHostNameByServerId(serverId)) || 'unknown';

  return (
    <Cell {...props}>
      {hostname}
    </Cell>
  )
}

export default ButtonCell;

export {
  ButtonCell,
  UsersCell,
  DurationCell,
  DateCreatedCell,
  EmptyList,
  SingleUserCell,
  NodeCell
};
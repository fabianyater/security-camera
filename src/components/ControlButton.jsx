import Button from './Button'

const ControlButton = ({ onClick, title, isActive, iconActive, iconInactive }) => {
  return (
    <Button onClick={onClick} title={title} isActive={isActive}>
      <img src={isActive ? iconActive : iconInactive} alt={title} loading="lazy"/>
    </Button>
  );
}

export default ControlButton
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';
// import Typography from '@material-ui/core/Typography';
// import Tooltip from '@material-ui/core/Tooltip';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 300 + theme.spacing(3) * 2,
//   },
//   margin: {
//     height: theme.spacing(3),
//   },
// }));

// function ValueLabelComponent(props) {
//   const { children, open, value } = props;

//   return (
//     <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
//       {children}
//     </Tooltip>
//   );
// }

// ValueLabelComponent.propTypes = {
//   children: PropTypes.element.isRequired,
//   open: PropTypes.bool.isRequired,
//   value: PropTypes.number.isRequired,
// };

// const marks = [
//   {
//     value: 0,
//   },
//   {
//     value: 20,
//   },
//   {
//     value: 37,
//   },
//   {
//     value: 100,
//   },
// ];

// const PrettoSlider = withStyles({
//   root: {
//     color: 'blue',
//     height: 8,
//   },
//   thumb: {
//     height: 14,
//     width: 14,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     marginTop: -8,
//     marginLeft: -12,
//     '&:focus, &:hover, &$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//   },
//   track: {
//     height: 6,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 6,
//     borderRadius: 4,
//   },
// })(Slider);

// export default function CustomizedSlider() {
//   const classNamees = useStyles();

//   return (
//     <div classNameName={classNamees.root}>
//       <Typography gutterBottom>pretto.fr</Typography>
//       <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
//       <div classNameName={classNamees.margin} />
//       <Typography gutterBottom>Tooltip value label</Typography>
//       <Slider
//         ValueLabelComponent={ValueLabelComponent}
//         aria-label="custom thumb label"
//         defaultValue={0}
//       />
//       <div classNameName={classNamees.margin} />

//     </div>
//   );
// }

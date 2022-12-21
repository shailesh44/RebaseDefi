import { React, useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { BiWallet } from "react-icons/bi";
// import { AiFillWarning } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const WalletToggle = (props) => {

  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse)

  return (<div className='walletCollapseBx'>
    <Button color="primary" className='walletCollapseBtn' onClick={toggle} style={{ marginBottom: '1rem' }}><i><BiWallet onClick={toggle} /></i> {props.address} <small><MdKeyboardArrowDown /></small></Button>
    <Collapse className='collapseOuterBx' isOpen={collapse}>
      <Card>
        <CardBody>
          <ul>

            <li><Link to='/pre-sale' onClick={props.disconnectwallet}>Disconnect <i><FiLogOut /></i></Link></li>
          </ul>
        </CardBody>
      </Card>
    </Collapse>
  </div>)
}
//    extends Component {
//   constructor(props) {
//     super(props);
//     this.toggle = this.toggle.bind(this);
//     this.state = { collapse: false };
//   }

//   toggle() {
//     this.setState({ collapse: !this.state.collapse });
//   }


//}

export default WalletToggle;
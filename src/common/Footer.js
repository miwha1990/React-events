import React,{ Component } from 'react';
import Footer from 'grommet/components/Footer';
class appFooter extends Component {
    render() {
        return (
            <Footer primary={true} appCentered={true} direction="column"
                        align="center" pad="small" colorIndex="grey-1">
            <p>
                Build your ideas with <a href="http://grommet.io" target="_blank">Grommet</a>!
            </p>
        </Footer>)
    }
}
export default appFooter;
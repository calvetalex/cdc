// React Core
import React, { Component } from 'react';

export default class _404 extends Component {
    render() {
        return (
            <div>
                <p
                    style={{
                        marginTop: 50,
                        fontSize: 150,
                        textAlign: 'center',
                    }}
                >
                    404
                </p>
                <p
                    style={{
                        marginTop: 25,
                        textAlign: 'center',
                        fontSize: 22,
                    }}
                >
                    La page que vous cherchez n&apos;existe pas...
                </p>
            </div>
        );
    }
}

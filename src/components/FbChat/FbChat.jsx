import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FbChat = () =>  {
    return (
        <FacebookProvider appId="1037222071118576" chatSupport>
            <CustomChat pageId="286823171186374" minimized={true}/>
        </FacebookProvider>
    );
}

export default FbChat
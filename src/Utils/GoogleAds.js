import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

mobileAds
    .initialize()
    .then(adapterStatues => {
        console.log('admob is ready');
    }
    )
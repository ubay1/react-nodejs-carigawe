import Lottie from 'lottie-react';
import SearchJob from '../assets/image_login3.json';

const AnimationAuth = () => {
    return(
    //     className = "
    //     hidden items - center fixed right - 0 w - 1 / 2 justify - center bg - white flex - 1 h - screen
    // lg: flex flex - col"
        <div className="flex justify-center items-center flex-col">
                <Lottie  animationData={SearchJob} style={{width: 450}} >
                </Lottie>
                <p style={{fontSize: '0.6rem'}} className="text-center">animation by 
                    <a href="https://lottiefiles.com/animoox" className="ml-1 text-blue-500 font-bold">Abdul Latif</a>
                </p>
        </div>
    )
}

export default AnimationAuth;
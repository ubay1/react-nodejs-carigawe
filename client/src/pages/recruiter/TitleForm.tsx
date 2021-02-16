
const TitleForm = (props: {title: string}) => {
    return(
        <div className="md:mt-5 mt-10 mx-4"> 
          <p className="text-xs text-black">{props.title}</p>
        </div>
    )
}

export default TitleForm;
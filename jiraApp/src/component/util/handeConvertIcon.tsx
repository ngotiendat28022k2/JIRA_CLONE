export const handeleConvertTypeToIcon = (types: any) => {
  switch (types) {
    case "task":
      return <i className="fa-solid fa-square-check text-blue-600"></i>
      break;
    case "bug":
      return <i className="fa-solid fa-circle-exclamation text-red-600"></i>
      break;
    case "story":
      return <i className="fa-sharp fa-solid fa-mug-saucer text-green-600"></i>;
      break;
  }
};

export const handleConvertPriority = (priority:any) => {
  switch (priority) {
    case "highest":
      return <i className="fa-solid fa-arrow-up text-red-600 ml-[7px]"></i>
      break;
    case "high":
      return <i className="fa-solid fa-arrow-up text-red-400 ml-[7px]"></i>
      break;
    case "medium":
      return <i className="fa-solid fa-arrow-up text-orange-500 ml-[7px]"></i>
      break;
    case "low":
      return <i className="fa-solid fa-arrow-down text-green-500 ml-[7px]"></i>
      break;
    case "lowest":
      return <i className="fa-solid fa-arrow-down text-green-600 ml-[7px]"></i>
      break;
  }
}
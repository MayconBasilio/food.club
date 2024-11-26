import { employeesFoto } from '../data/mockData'

interface IProps {
    image: object[];
}

export const MappingImage = ({image}:IProps) => {
    return (
        <div>
      {employeesFoto.map((employee, index) => (
        <img key={index} src={employee.image} alt={`Employee ${index}`} />
      ))}
    </div>
    )
}

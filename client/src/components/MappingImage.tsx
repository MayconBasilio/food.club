import { employeesFoto } from '../data/mockData'

interface IProps {
    image: [object];
}

export const MappingImage = ({image}:IProps) => {
    return (
        {employeesFoto.map(({image}) => {

        })}
    )
}

import * as PropTypes from "prop-types";

export interface ClientCreateFormContactCardProps {
    prefix: string;
    title: string;
}

export const ClientCreateFormContactCardPropTypes: PropTypes.ValidationMap<ClientCreateFormContactCardProps> = {
    prefix: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

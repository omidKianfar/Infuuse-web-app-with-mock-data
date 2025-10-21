import ticketStore from '@/store/ticket.store';
import { useSnapshot } from 'valtio';
import AddTicketSidebar from './add-ticket';
import EditTicketSidebar from './edit-ticket';

interface Props {
	businessId: number
}

const TicketSidebar = ({ businessId }: Props) => {
	// -------------------------------context
	const { ticketSidebar, ticketId } = useSnapshot(ticketStore);

	return <>{ticketId === null ? <AddTicketSidebar /> : <EditTicketSidebar businessId={businessId} />}</>;
};

export default TicketSidebar;

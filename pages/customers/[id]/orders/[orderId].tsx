import { useRouter } from "next/router";

export default function Order() {
  const router = useRouter();
  const { id, orderId } = router.query;
  return (
    <>
      <div>
        <h4>
          Order {orderId} from customer {id}
        </h4>
      </div>
    </>
  );
}

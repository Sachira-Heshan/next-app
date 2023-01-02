import { useRouter } from "next/router";

export default function Orders() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>
        <h4>All Orders from Customer {id}</h4>
      </div>
    </>
  );
}

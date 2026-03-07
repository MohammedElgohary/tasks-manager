import { Flex, Spin } from 'antd';

export function Loader() {
  return (
    <Flex justify="center" align="center" className="h-screen">
      <Spin />
    </Flex>
  );
}

import { ActivityFeedContainer, FeedRow } from "@/components/business";

const RecentEvent: React.FC = () => {
  return (
    <>
      <ActivityFeedContainer title="最近活动" onMoreClick={() => {}}>
        <FeedRow dotColor="#3b82f6" isLast={false}>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">用户 张三 创建了新订单</span>
            <span className="text-gray-400 text-xs">2分钟前</span>
          </div>
        </FeedRow>
        <FeedRow dotColor="#22c55e" isLast={true}>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">管理员 李四 更新了产品信息</span>
            <span className="text-gray-400 text-xs">15分钟前</span>
          </div>
        </FeedRow>
      </ActivityFeedContainer>
    </>
  );
};

export default RecentEvent;

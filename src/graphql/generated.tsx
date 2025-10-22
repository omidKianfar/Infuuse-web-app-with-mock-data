import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from 'src/graphql/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Any: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  Long: { input: any; output: any; }
};

export type AccountStateDto = {
  __typename?: 'AccountStateDto';
  accountExpireDate: Scalars['DateTime']['output'];
  activeOperatorCount: Scalars['Int']['output'];
  maxOperatorCount: Scalars['Int']['output'];
};

export enum AccountStatus {
  Active = 'ACTIVE',
  AwaitingSubscriptionPayment = 'AWAITING_SUBSCRIPTION_PAYMENT',
  Suspended = 'SUSPENDED'
}

export type AccountStatusOperationFilterInput = {
  eq?: InputMaybe<AccountStatus>;
  in?: InputMaybe<Array<AccountStatus>>;
  neq?: InputMaybe<AccountStatus>;
  nin?: InputMaybe<Array<AccountStatus>>;
};

export type Agency = {
  __typename?: 'Agency';
  agencyMembers?: Maybe<Array<Maybe<AgencyMember>>>;
  createdDate: Scalars['DateTime']['output'];
  expireDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maxOperatorCount: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status: AccountStatus;
};

export type AgencyAdminDetailsDto = {
  __typename?: 'AgencyAdminDetailsDto';
  agency?: Maybe<Agency>;
  agencyOwner?: Maybe<AgencyMember>;
  businesses?: Maybe<Array<Maybe<Business>>>;
  connectedBusinessCount: Scalars['Int']['output'];
};

export type AgencyAdminDto = {
  __typename?: 'AgencyAdminDto';
  agency?: Maybe<Agency>;
  agencyOwner?: Maybe<AgencyMember>;
};

/** A segment of a collection. */
export type AgencyAdminDtoCollectionSegment = {
  __typename?: 'AgencyAdminDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<AgencyAdminDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type AgencyAdminDtoFilterInput = {
  agency?: InputMaybe<AgencyFilterInput>;
  agencyOwner?: InputMaybe<AgencyMemberFilterInput>;
  and?: InputMaybe<Array<AgencyAdminDtoFilterInput>>;
  or?: InputMaybe<Array<AgencyAdminDtoFilterInput>>;
};

export type AgencyAdminDtoSortInput = {
  agency?: InputMaybe<AgencySortInput>;
  agencyOwner?: InputMaybe<AgencyMemberSortInput>;
};

export type AgencyAdminInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AccountStatus>;
};

export type AgencyFilterInput = {
  agencyMembers?: InputMaybe<ListFilterInputTypeOfAgencyMemberFilterInput>;
  and?: InputMaybe<Array<AgencyFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  expireDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  maxOperatorCount?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AgencyFilterInput>>;
  status?: InputMaybe<AccountStatusOperationFilterInput>;
};

export type AgencyInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AgencyMember = {
  __typename?: 'AgencyMember';
  about?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  agency?: Maybe<Agency>;
  agencyId: Scalars['Int']['output'];
  agencyMemberAssignments?: Maybe<Array<Maybe<AgencyMemberAssignment>>>;
  assignTickets?: Maybe<Array<Maybe<Ticket>>>;
  calendarAccessToken?: Maybe<Scalars['String']['output']>;
  calendarAccessTokenExpireDate?: Maybe<Scalars['DateTime']['output']>;
  calendarRefreshToken?: Maybe<Scalars['String']['output']>;
  conversationMembers?: Maybe<Array<Maybe<ConversationMember>>>;
  createdDate: Scalars['DateTime']['output'];
  creatorDeals?: Maybe<Array<Maybe<Deal>>>;
  creatorPaymentHistory?: Maybe<Array<Maybe<PaymentHistory>>>;
  creatorTickets?: Maybe<Array<Maybe<Ticket>>>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isManageAgencyUserAccess: Scalars['Boolean']['output'];
  isOnline: Scalars['Boolean']['output'];
  isSubscriptionAccess: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  lineStatus: LineStatus;
  location?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  ownerPaymentHistory?: Maybe<Array<Maybe<PaymentHistory>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  twilioHistoryCalls?: Maybe<Array<Maybe<TwilioHistoryCall>>>;
  twilioHistoryVideos?: Maybe<Array<Maybe<TwilioHistoryVideo>>>;
  typeMember: AgencyTypeMember;
  userType: UserType;
};

export type AgencyMemberAssignment = {
  __typename?: 'AgencyMemberAssignment';
  agencyMember?: Maybe<AgencyMember>;
  agencyMemberId: Scalars['Int']['output'];
  business?: Maybe<Business>;
  businessId: Scalars['Int']['output'];
  businessMember?: Maybe<BusinessMember>;
  colorTag?: Maybe<ColorTagType>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isAgentOwner: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isOpratorAccess: Scalars['Boolean']['output'];
  isReportAccess: Scalars['Boolean']['output'];
  isSettingsManagmentAccess: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  status: AgencyMemberAssignmentStatus;
};

/** A segment of a collection. */
export type AgencyMemberAssignmentCollectionSegment = {
  __typename?: 'AgencyMemberAssignmentCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<AgencyMemberAssignment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type AgencyMemberAssignmentFilterInput = {
  agencyMember?: InputMaybe<AgencyMemberFilterInput>;
  agencyMemberId?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<AgencyMemberAssignmentFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  businessId?: InputMaybe<IntOperationFilterInput>;
  businessMember?: InputMaybe<BusinessMemberFilterInput>;
  colorTag?: InputMaybe<NullableOfColorTagTypeOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isAgentOwner?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isOpratorAccess?: InputMaybe<BooleanOperationFilterInput>;
  isReportAccess?: InputMaybe<BooleanOperationFilterInput>;
  isSettingsManagmentAccess?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<AgencyMemberAssignmentFilterInput>>;
  status?: InputMaybe<AgencyMemberAssignmentStatusOperationFilterInput>;
};

export type AgencyMemberAssignmentInput = {
  isOpratorAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isReportAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isSettingsManagmentAccess?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<AgencyMemberAssignmentStatus>;
};

export type AgencyMemberAssignmentSortInput = {
  agencyMember?: InputMaybe<AgencyMemberSortInput>;
  agencyMemberId?: InputMaybe<SortEnumType>;
  business?: InputMaybe<BusinessSortInput>;
  businessId?: InputMaybe<SortEnumType>;
  businessMember?: InputMaybe<BusinessMemberSortInput>;
  colorTag?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAgentOwner?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isOpratorAccess?: InputMaybe<SortEnumType>;
  isReportAccess?: InputMaybe<SortEnumType>;
  isSettingsManagmentAccess?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export enum AgencyMemberAssignmentStatus {
  Approved = 'APPROVED',
  Canceled = 'CANCELED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type AgencyMemberAssignmentStatusOperationFilterInput = {
  eq?: InputMaybe<AgencyMemberAssignmentStatus>;
  in?: InputMaybe<Array<AgencyMemberAssignmentStatus>>;
  neq?: InputMaybe<AgencyMemberAssignmentStatus>;
  nin?: InputMaybe<Array<AgencyMemberAssignmentStatus>>;
};

/** A segment of a collection. */
export type AgencyMemberCollectionSegment = {
  __typename?: 'AgencyMemberCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<AgencyMember>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type AgencyMemberFilterInput = {
  about?: InputMaybe<StringOperationFilterInput>;
  age?: InputMaybe<IntOperationFilterInput>;
  agency?: InputMaybe<AgencyFilterInput>;
  agencyId?: InputMaybe<IntOperationFilterInput>;
  agencyMemberAssignments?: InputMaybe<ListFilterInputTypeOfAgencyMemberAssignmentFilterInput>;
  and?: InputMaybe<Array<AgencyMemberFilterInput>>;
  assignTickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  calendarAccessToken?: InputMaybe<StringOperationFilterInput>;
  calendarAccessTokenExpireDate?: InputMaybe<DateTimeOperationFilterInput>;
  calendarRefreshToken?: InputMaybe<StringOperationFilterInput>;
  conversationMembers?: InputMaybe<ListFilterInputTypeOfConversationMemberFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creatorDeals?: InputMaybe<ListFilterInputTypeOfDealFilterInput>;
  creatorPaymentHistory?: InputMaybe<ListFilterInputTypeOfPaymentHistoryFilterInput>;
  creatorTickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  dateOfBirth?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isManageAgencyUserAccess?: InputMaybe<BooleanOperationFilterInput>;
  isOnline?: InputMaybe<BooleanOperationFilterInput>;
  isSubscriptionAccess?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  lineStatus?: InputMaybe<LineStatusOperationFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  notifications?: InputMaybe<ListFilterInputTypeOfNotificationFilterInput>;
  or?: InputMaybe<Array<AgencyMemberFilterInput>>;
  ownerPaymentHistory?: InputMaybe<ListFilterInputTypeOfPaymentHistoryFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  stripeCustomerId?: InputMaybe<StringOperationFilterInput>;
  stripeSubscriptionId?: InputMaybe<StringOperationFilterInput>;
  twilioHistoryCalls?: InputMaybe<ListFilterInputTypeOfTwilioHistoryCallFilterInput>;
  twilioHistoryVideos?: InputMaybe<ListFilterInputTypeOfTwilioHistoryVideoFilterInput>;
  typeMember?: InputMaybe<AgencyTypeMemberOperationFilterInput>;
  userType?: InputMaybe<UserTypeOperationFilterInput>;
};

export type AgencyMemberInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isManageAgencyUserAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isSubscriptionAccess?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AgencyMemberSortInput = {
  about?: InputMaybe<SortEnumType>;
  age?: InputMaybe<SortEnumType>;
  agency?: InputMaybe<AgencySortInput>;
  agencyId?: InputMaybe<SortEnumType>;
  calendarAccessToken?: InputMaybe<SortEnumType>;
  calendarAccessTokenExpireDate?: InputMaybe<SortEnumType>;
  calendarRefreshToken?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  dateOfBirth?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isManageAgencyUserAccess?: InputMaybe<SortEnumType>;
  isOnline?: InputMaybe<SortEnumType>;
  isSubscriptionAccess?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  lineStatus?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  stripeCustomerId?: InputMaybe<SortEnumType>;
  stripeSubscriptionId?: InputMaybe<SortEnumType>;
  typeMember?: InputMaybe<SortEnumType>;
  userType?: InputMaybe<SortEnumType>;
};

export type AgencySortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  expireDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  maxOperatorCount?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export type AgencyTeamDto = {
  __typename?: 'AgencyTeamDto';
  agencyMembers?: Maybe<Array<Maybe<AgencyMember>>>;
  businessAccesses?: Maybe<Array<Maybe<BusinessAssignmentDto>>>;
};

export enum AgencyTypeMember {
  Agent = 'AGENT',
  Member = 'MEMBER'
}

export type AgencyTypeMemberOperationFilterInput = {
  eq?: InputMaybe<AgencyTypeMember>;
  in?: InputMaybe<Array<AgencyTypeMember>>;
  neq?: InputMaybe<AgencyTypeMember>;
  nin?: InputMaybe<Array<AgencyTypeMember>>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export enum AttachmentType {
  File = 'FILE',
  Image = 'IMAGE',
  Video = 'VIDEO',
  Voice = 'VOICE'
}

export type AttachmentTypeOperationFilterInput = {
  eq?: InputMaybe<AttachmentType>;
  in?: InputMaybe<Array<AttachmentType>>;
  neq?: InputMaybe<AttachmentType>;
  nin?: InputMaybe<Array<AttachmentType>>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  expiresIn: Scalars['Int']['output'];
  idToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<FirebaseUser>;
};

export type AverageTimeOnHoldDto = {
  __typename?: 'AverageTimeOnHoldDto';
  avgResponseTime: Scalars['Float']['output'];
  typeSocialNetwork: TypeSocialNetwork;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Business = {
  __typename?: 'Business';
  agencyMemberAssignments?: Maybe<Array<Maybe<AgencyMemberAssignment>>>;
  businessKey?: Maybe<Scalars['String']['output']>;
  businessMembers?: Maybe<Array<Maybe<BusinessMember>>>;
  businessNetworks?: Maybe<Array<Maybe<BusinessNetwork>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  createdDate: Scalars['DateTime']['output'];
  expireDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isHideAgency: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maxOperatorCount: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  status: AccountStatus;
  tickets?: Maybe<Array<Maybe<Ticket>>>;
  twilioPhoneNumber?: Maybe<TwilioPhoneNumber>;
  twilioPhoneNumberId?: Maybe<Scalars['Int']['output']>;
};

export type BusinessAccessDto = {
  __typename?: 'BusinessAccessDto';
  access?: Maybe<MemberAccessDto>;
  business?: Maybe<Business>;
};

export type BusinessAdminDetailsDto = {
  __typename?: 'BusinessAdminDetailsDto';
  business?: Maybe<Business>;
  businessOwner?: Maybe<BusinessMember>;
  businessTeam?: Maybe<Array<Maybe<User>>>;
  contactsCount: Scalars['Int']['output'];
};

export type BusinessAdminDto = {
  __typename?: 'BusinessAdminDto';
  business?: Maybe<Business>;
  businessOwner?: Maybe<BusinessMember>;
};

/** A segment of a collection. */
export type BusinessAdminDtoCollectionSegment = {
  __typename?: 'BusinessAdminDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BusinessAdminDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BusinessAdminDtoFilterInput = {
  and?: InputMaybe<Array<BusinessAdminDtoFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  businessOwner?: InputMaybe<BusinessMemberFilterInput>;
  or?: InputMaybe<Array<BusinessAdminDtoFilterInput>>;
};

export type BusinessAdminDtoSortInput = {
  business?: InputMaybe<BusinessSortInput>;
  businessOwner?: InputMaybe<BusinessMemberSortInput>;
};

export type BusinessAdminInput = {
  isHideAgency?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AccountStatus>;
  twilioPhoneNumberId?: InputMaybe<Scalars['Int']['input']>;
};

export type BusinessAssignmentDto = {
  __typename?: 'BusinessAssignmentDto';
  business?: Maybe<Business>;
  businessTeams?: Maybe<Array<Maybe<User>>>;
};

/** A segment of a collection. */
export type BusinessCollectionSegment = {
  __typename?: 'BusinessCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Business>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BusinessColorTagDto = {
  __typename?: 'BusinessColorTagDto';
  business?: Maybe<Business>;
  colorTag?: Maybe<ColorTagType>;
};

/** A segment of a collection. */
export type BusinessColorTagDtoCollectionSegment = {
  __typename?: 'BusinessColorTagDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BusinessColorTagDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BusinessColorTagDtoFilterInput = {
  and?: InputMaybe<Array<BusinessColorTagDtoFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  colorTag?: InputMaybe<NullableOfColorTagTypeOperationFilterInput>;
  or?: InputMaybe<Array<BusinessColorTagDtoFilterInput>>;
};

export type BusinessColorTagDtoSortInput = {
  business?: InputMaybe<BusinessSortInput>;
  colorTag?: InputMaybe<SortEnumType>;
};

export type BusinessFilterInput = {
  agencyMemberAssignments?: InputMaybe<ListFilterInputTypeOfAgencyMemberAssignmentFilterInput>;
  and?: InputMaybe<Array<BusinessFilterInput>>;
  businessKey?: InputMaybe<StringOperationFilterInput>;
  businessMembers?: InputMaybe<ListFilterInputTypeOfBusinessMemberFilterInput>;
  businessNetworks?: InputMaybe<ListFilterInputTypeOfBusinessNetworkFilterInput>;
  categories?: InputMaybe<ListFilterInputTypeOfCategoryFilterInput>;
  contacts?: InputMaybe<ListFilterInputTypeOfContactFilterInput>;
  conversations?: InputMaybe<ListFilterInputTypeOfConversationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  expireDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isHideAgency?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  maxOperatorCount?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BusinessFilterInput>>;
  status?: InputMaybe<AccountStatusOperationFilterInput>;
  tickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  twilioPhoneNumber?: InputMaybe<TwilioPhoneNumberFilterInput>;
  twilioPhoneNumberId?: InputMaybe<IntOperationFilterInput>;
};

export type BusinessInput = {
  isHideAgency?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BusinessMember = {
  __typename?: 'BusinessMember';
  about?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  assignTickets?: Maybe<Array<Maybe<Ticket>>>;
  business?: Maybe<Business>;
  businessId: Scalars['Int']['output'];
  calendarAccessToken?: Maybe<Scalars['String']['output']>;
  calendarAccessTokenExpireDate?: Maybe<Scalars['DateTime']['output']>;
  calendarRefreshToken?: Maybe<Scalars['String']['output']>;
  conversationMembers?: Maybe<Array<Maybe<ConversationMember>>>;
  createdDate: Scalars['DateTime']['output'];
  creatorDeals?: Maybe<Array<Maybe<Deal>>>;
  creatorPaymentHistory?: Maybe<Array<Maybe<PaymentHistory>>>;
  creatorTickets?: Maybe<Array<Maybe<Ticket>>>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isManageBusinessUserAccess: Scalars['Boolean']['output'];
  isOnline: Scalars['Boolean']['output'];
  isOpratorAccess: Scalars['Boolean']['output'];
  isReportAccess: Scalars['Boolean']['output'];
  isSettingsManagmentAccess: Scalars['Boolean']['output'];
  isSocialManagmentAccess: Scalars['Boolean']['output'];
  isSubscriptionAccess: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  lineStatus: LineStatus;
  location?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  ownerPaymentHistory?: Maybe<Array<Maybe<PaymentHistory>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  twilioHistoryCalls?: Maybe<Array<Maybe<TwilioHistoryCall>>>;
  twilioHistoryVideos?: Maybe<Array<Maybe<TwilioHistoryVideo>>>;
  typeMember: BusinessTypeMember;
  userType: UserType;
};

/** A segment of a collection. */
export type BusinessMemberCollectionSegment = {
  __typename?: 'BusinessMemberCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BusinessMember>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BusinessMemberFilterInput = {
  about?: InputMaybe<StringOperationFilterInput>;
  age?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<BusinessMemberFilterInput>>;
  assignTickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  business?: InputMaybe<BusinessFilterInput>;
  businessId?: InputMaybe<IntOperationFilterInput>;
  calendarAccessToken?: InputMaybe<StringOperationFilterInput>;
  calendarAccessTokenExpireDate?: InputMaybe<DateTimeOperationFilterInput>;
  calendarRefreshToken?: InputMaybe<StringOperationFilterInput>;
  conversationMembers?: InputMaybe<ListFilterInputTypeOfConversationMemberFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creatorDeals?: InputMaybe<ListFilterInputTypeOfDealFilterInput>;
  creatorPaymentHistory?: InputMaybe<ListFilterInputTypeOfPaymentHistoryFilterInput>;
  creatorTickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  dateOfBirth?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isManageBusinessUserAccess?: InputMaybe<BooleanOperationFilterInput>;
  isOnline?: InputMaybe<BooleanOperationFilterInput>;
  isOpratorAccess?: InputMaybe<BooleanOperationFilterInput>;
  isReportAccess?: InputMaybe<BooleanOperationFilterInput>;
  isSettingsManagmentAccess?: InputMaybe<BooleanOperationFilterInput>;
  isSocialManagmentAccess?: InputMaybe<BooleanOperationFilterInput>;
  isSubscriptionAccess?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  lineStatus?: InputMaybe<LineStatusOperationFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  notifications?: InputMaybe<ListFilterInputTypeOfNotificationFilterInput>;
  or?: InputMaybe<Array<BusinessMemberFilterInput>>;
  ownerPaymentHistory?: InputMaybe<ListFilterInputTypeOfPaymentHistoryFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  stripeCustomerId?: InputMaybe<StringOperationFilterInput>;
  stripeSubscriptionId?: InputMaybe<StringOperationFilterInput>;
  twilioHistoryCalls?: InputMaybe<ListFilterInputTypeOfTwilioHistoryCallFilterInput>;
  twilioHistoryVideos?: InputMaybe<ListFilterInputTypeOfTwilioHistoryVideoFilterInput>;
  typeMember?: InputMaybe<BusinessTypeMemberOperationFilterInput>;
  userType?: InputMaybe<UserTypeOperationFilterInput>;
};

export type BusinessMemberInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isManageBusinessUserAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isOpratorAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isReportAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isSettingsManagmentAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isSocialManagmentAccess?: InputMaybe<Scalars['Boolean']['input']>;
  isSubscriptionAccess?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BusinessMemberSortInput = {
  about?: InputMaybe<SortEnumType>;
  age?: InputMaybe<SortEnumType>;
  business?: InputMaybe<BusinessSortInput>;
  businessId?: InputMaybe<SortEnumType>;
  calendarAccessToken?: InputMaybe<SortEnumType>;
  calendarAccessTokenExpireDate?: InputMaybe<SortEnumType>;
  calendarRefreshToken?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  dateOfBirth?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isManageBusinessUserAccess?: InputMaybe<SortEnumType>;
  isOnline?: InputMaybe<SortEnumType>;
  isOpratorAccess?: InputMaybe<SortEnumType>;
  isReportAccess?: InputMaybe<SortEnumType>;
  isSettingsManagmentAccess?: InputMaybe<SortEnumType>;
  isSocialManagmentAccess?: InputMaybe<SortEnumType>;
  isSubscriptionAccess?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  lineStatus?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  stripeCustomerId?: InputMaybe<SortEnumType>;
  stripeSubscriptionId?: InputMaybe<SortEnumType>;
  typeMember?: InputMaybe<SortEnumType>;
  userType?: InputMaybe<SortEnumType>;
};

export type BusinessNetwork = {
  __typename?: 'BusinessNetwork';
  business?: Maybe<Business>;
  businessId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** This is a computed property and please avoid to use it in your where clause */
  needToReAuth: Scalars['Boolean']['output'];
  status: BusinessNetworkStatus;
  token?: Maybe<Scalars['String']['output']>;
  typeBusinessNetwork: TypeBusinessNetwork;
  url?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type BusinessNetworkCollectionSegment = {
  __typename?: 'BusinessNetworkCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BusinessNetwork>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type BusinessNetworkFilterInput = {
  and?: InputMaybe<Array<BusinessNetworkFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  businessId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  /** This is a computed property and please avoid to use it in your where clause */
  needToReAuth?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<BusinessNetworkFilterInput>>;
  status?: InputMaybe<BusinessNetworkStatusOperationFilterInput>;
  token?: InputMaybe<StringOperationFilterInput>;
  typeBusinessNetwork?: InputMaybe<TypeBusinessNetworkOperationFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
  value?: InputMaybe<StringOperationFilterInput>;
};

export type BusinessNetworkSortInput = {
  business?: InputMaybe<BusinessSortInput>;
  businessId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  /** This is a computed property and please avoid to use it in your where clause */
  needToReAuth?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  token?: InputMaybe<SortEnumType>;
  typeBusinessNetwork?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
};

export enum BusinessNetworkStatus {
  Active = 'ACTIVE',
  InProgress = 'IN_PROGRESS',
  NeedToAuth = 'NEED_TO_AUTH',
  None = 'NONE',
  NoSync = 'NO_SYNC'
}

export type BusinessNetworkStatusOperationFilterInput = {
  eq?: InputMaybe<BusinessNetworkStatus>;
  in?: InputMaybe<Array<BusinessNetworkStatus>>;
  neq?: InputMaybe<BusinessNetworkStatus>;
  nin?: InputMaybe<Array<BusinessNetworkStatus>>;
};

export type BusinessSortInput = {
  businessKey?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  expireDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isHideAgency?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  maxOperatorCount?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  twilioPhoneNumber?: InputMaybe<TwilioPhoneNumberSortInput>;
  twilioPhoneNumberId?: InputMaybe<SortEnumType>;
};

export enum BusinessTypeMember {
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type BusinessTypeMemberOperationFilterInput = {
  eq?: InputMaybe<BusinessTypeMember>;
  in?: InputMaybe<Array<BusinessTypeMember>>;
  neq?: InputMaybe<BusinessTypeMember>;
  nin?: InputMaybe<Array<BusinessTypeMember>>;
};

export type CalculateOperatorModificationDto = {
  __typename?: 'CalculateOperatorModificationDto';
  cost: Scalars['Decimal']['output'];
  period?: Maybe<Scalars['String']['output']>;
};

export type CalculateSubscriptionCostDto = {
  __typename?: 'CalculateSubscriptionCostDto';
  discount: Scalars['Decimal']['output'];
  price: Scalars['Decimal']['output'];
};

export type CalculateSubscriptionCostInput = {
  operatorCount: Scalars['Int']['input'];
  planType: PlanType;
};

export type CalendarAccessTokenDto = {
  __typename?: 'CalendarAccessTokenDto';
  accessToken?: Maybe<Scalars['String']['output']>;
  baseTokenExpiration: Scalars['DateTime']['output'];
  expirationTime: Scalars['DateTime']['output'];
  expiresIn: Scalars['Int']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  scopes?: Maybe<Scalars['String']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
};

export enum CallStatus {
  Call = 'CALL',
  Complete = 'COMPLETE',
  Conversation = 'CONVERSATION',
  Hold = 'HOLD',
  InProcess = 'IN_PROCESS',
  InQueue = 'IN_QUEUE',
  Reject = 'REJECT',
  Waiting = 'WAITING'
}

export type CallStatusOperationFilterInput = {
  eq?: InputMaybe<CallStatus>;
  in?: InputMaybe<Array<CallStatus>>;
  neq?: InputMaybe<CallStatus>;
  nin?: InputMaybe<Array<CallStatus>>;
};

export type CallTokenDto = {
  __typename?: 'CallTokenDto';
  inboundClientId?: Maybe<Scalars['String']['output']>;
  outboundClientId?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  business?: Maybe<Business>;
  businessId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tagCategories?: Maybe<Array<Maybe<TagCategory>>>;
  templates?: Maybe<Array<Maybe<Template>>>;
};

/** A segment of a collection. */
export type CategoryCollectionSegment = {
  __typename?: 'CategoryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  businessId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
  tagCategories?: InputMaybe<ListFilterInputTypeOfTagCategoryFilterInput>;
  templates?: InputMaybe<ListFilterInputTypeOfTemplateFilterInput>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CategorySortInput = {
  business?: InputMaybe<BusinessSortInput>;
  businessId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export enum ColorTagType {
  Black = 'BLACK',
  Blue = 'BLUE',
  Brown = 'BROWN',
  Gold = 'GOLD',
  Green = 'GREEN',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  SeaGreen = 'SEA_GREEN',
  Tan = 'TAN',
  Turquoise = 'TURQUOISE',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type Contact = {
  __typename?: 'Contact';
  business?: Maybe<Business>;
  businessId: Scalars['Int']['output'];
  company?: Maybe<Scalars['String']['output']>;
  contactNetworks?: Maybe<Array<Maybe<ContactNetwork>>>;
  contactTagCategories?: Maybe<Array<Maybe<ContactTagCategory>>>;
  conversation?: Maybe<Conversation>;
  conversationId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  dealStatus?: Maybe<DealStatus>;
  deals?: Maybe<Array<Maybe<Deal>>>;
  firstName?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  hubSpotContactId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Array<Maybe<Note>>>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  tickets?: Maybe<Array<Maybe<Ticket>>>;
};

/** A segment of a collection. */
export type ContactCollectionSegment = {
  __typename?: 'ContactCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Contact>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ContactFilterInput = {
  and?: InputMaybe<Array<ContactFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  businessId?: InputMaybe<IntOperationFilterInput>;
  company?: InputMaybe<StringOperationFilterInput>;
  contactNetworks?: InputMaybe<ListFilterInputTypeOfContactNetworkFilterInput>;
  contactTagCategories?: InputMaybe<ListFilterInputTypeOfContactTagCategoryFilterInput>;
  conversation?: InputMaybe<ConversationFilterInput>;
  conversationId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  dealStatus?: InputMaybe<NullableOfDealStatusOperationFilterInput>;
  deals?: InputMaybe<ListFilterInputTypeOfDealFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  hubSpotContactId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  jobTitle?: InputMaybe<StringOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  notes?: InputMaybe<ListFilterInputTypeOfNoteFilterInput>;
  or?: InputMaybe<Array<ContactFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  tickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
};

export type ContactInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  contactNetworks?: InputMaybe<Array<InputMaybe<ContactNetworkInput>>>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  isHubSpot?: InputMaybe<Scalars['Boolean']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DealStatus>;
};

export type ContactNetwork = {
  __typename?: 'ContactNetwork';
  contact?: Maybe<Contact>;
  contactId: Scalars['Int']['output'];
  conversationMessages?: Maybe<Array<Maybe<ConversationMessage>>>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  typeContactNetwork: TypeContactNetwork;
  url?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type ContactNetworkCollectionSegment = {
  __typename?: 'ContactNetworkCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ContactNetwork>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ContactNetworkFilterInput = {
  and?: InputMaybe<Array<ContactNetworkFilterInput>>;
  contact?: InputMaybe<ContactFilterInput>;
  contactId?: InputMaybe<IntOperationFilterInput>;
  conversationMessages?: InputMaybe<ListFilterInputTypeOfConversationMessageFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ContactNetworkFilterInput>>;
  typeContactNetwork?: InputMaybe<TypeContactNetworkOperationFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
  value?: InputMaybe<StringOperationFilterInput>;
};

export type ContactNetworkInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  typeContactNetwork?: InputMaybe<TypeContactNetwork>;
  url?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ContactNetworkSortInput = {
  contact?: InputMaybe<ContactSortInput>;
  contactId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  typeContactNetwork?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
};

export type ContactSortInput = {
  business?: InputMaybe<BusinessSortInput>;
  businessId?: InputMaybe<SortEnumType>;
  company?: InputMaybe<SortEnumType>;
  conversation?: InputMaybe<ConversationSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  dealStatus?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  hubSpotContactId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  jobTitle?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
};

export type ContactTagCategory = {
  __typename?: 'ContactTagCategory';
  contact?: Maybe<Contact>;
  contactId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  tagCategory?: Maybe<TagCategory>;
  tagCategoryId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type ContactTagCategoryCollectionSegment = {
  __typename?: 'ContactTagCategoryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ContactTagCategory>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ContactTagCategoryFilterInput = {
  and?: InputMaybe<Array<ContactTagCategoryFilterInput>>;
  contact?: InputMaybe<ContactFilterInput>;
  contactId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isPinned?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ContactTagCategoryFilterInput>>;
  tagCategory?: InputMaybe<TagCategoryFilterInput>;
  tagCategoryId?: InputMaybe<IntOperationFilterInput>;
};

export type ContactTagCategoryInput = {
  isPinned?: InputMaybe<Scalars['Boolean']['input']>;
  tagCategoryId?: InputMaybe<Scalars['Int']['input']>;
};

export type ContactTagCategorySortInput = {
  contact?: InputMaybe<ContactSortInput>;
  contactId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isPinned?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  tagCategory?: InputMaybe<TagCategorySortInput>;
  tagCategoryId?: InputMaybe<SortEnumType>;
};

export type Conversation = {
  __typename?: 'Conversation';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['Int']['output']>;
  contact?: Maybe<Contact>;
  conversationMembers?: Maybe<Array<Maybe<ConversationMember>>>;
  conversationMessages?: Maybe<Array<Maybe<ConversationMessage>>>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  lastMessage?: Maybe<ConversationMessage>;
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  numberOfUnreadMessages: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: ConversationType;
};

export type ConversationAttachment = {
  __typename?: 'ConversationAttachment';
  conversationMessage?: Maybe<ConversationMessage>;
  conversationMessageId: Scalars['Long']['output'];
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  type: AttachmentType;
  url?: Maybe<Scalars['String']['output']>;
};

export type ConversationAttachmentFilterInput = {
  and?: InputMaybe<Array<ConversationAttachmentFilterInput>>;
  conversationMessage?: InputMaybe<ConversationMessageFilterInput>;
  conversationMessageId?: InputMaybe<LongOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ConversationAttachmentFilterInput>>;
  type?: InputMaybe<AttachmentTypeOperationFilterInput>;
  url?: InputMaybe<StringOperationFilterInput>;
};

export type ConversationAttachmentInput = {
  type?: InputMaybe<AttachmentType>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ConversationAvgResponseTimeDto = {
  __typename?: 'ConversationAvgResponseTimeDto';
  avgResponseTime: Scalars['Float']['output'];
  operatorFullName?: Maybe<Scalars['String']['output']>;
  operatorId?: Maybe<Scalars['Int']['output']>;
};

/** A segment of a collection. */
export type ConversationCollectionSegment = {
  __typename?: 'ConversationCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Conversation>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ConversationFilterInput = {
  and?: InputMaybe<Array<ConversationFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  businessId?: InputMaybe<IntOperationFilterInput>;
  contact?: InputMaybe<ContactFilterInput>;
  conversationMembers?: InputMaybe<ListFilterInputTypeOfConversationMemberFilterInput>;
  conversationMessages?: InputMaybe<ListFilterInputTypeOfConversationMessageFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isPinned?: InputMaybe<BooleanOperationFilterInput>;
  lastMessage?: InputMaybe<ConversationMessageFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  numberOfUnreadMessages?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ConversationFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
  type?: InputMaybe<ConversationTypeOperationFilterInput>;
};

export type ConversationInput = {
  contactId?: InputMaybe<Scalars['Int']['input']>;
  isPinned?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ConversationType>;
};

export type ConversationMember = {
  __typename?: 'ConversationMember';
  conversation?: Maybe<Conversation>;
  conversationId: Scalars['Int']['output'];
  conversationMessages?: Maybe<Array<Maybe<ConversationMessage>>>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type ConversationMemberCollectionSegment = {
  __typename?: 'ConversationMemberCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ConversationMember>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ConversationMemberFilterInput = {
  and?: InputMaybe<Array<ConversationMemberFilterInput>>;
  conversation?: InputMaybe<ConversationFilterInput>;
  conversationId?: InputMaybe<IntOperationFilterInput>;
  conversationMessages?: InputMaybe<ListFilterInputTypeOfConversationMessageFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ConversationMemberFilterInput>>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type ConversationMemberInput = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type ConversationMemberSortInput = {
  conversation?: InputMaybe<ConversationSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type ConversationMessage = {
  __typename?: 'ConversationMessage';
  contactNetwork?: Maybe<ContactNetwork>;
  contactNetworkId?: Maybe<Scalars['Int']['output']>;
  conversation?: Maybe<Conversation>;
  conversationAttachments?: Maybe<Array<Maybe<ConversationAttachment>>>;
  conversationId: Scalars['Int']['output'];
  conversationMember?: Maybe<ConversationMember>;
  conversationMemberId?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Long']['output'];
  isAttachment: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  /** This is a computed property and please avoid to use it in your where clause */
  isReplyTo?: Maybe<Scalars['Long']['output']>;
  isSeen: Scalars['Boolean']['output'];
  isSentByContact: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['String']['output']>;
  /** This is a computed property and please avoid to use it in your where clause */
  subject?: Maybe<Scalars['String']['output']>;
  /** This is a computed property and please avoid to use it in your where clause */
  summaryReplyMessage?: Maybe<Scalars['String']['output']>;
  twilioHistoryCall?: Maybe<TwilioHistoryCall>;
  twilioHistoryCallId?: Maybe<Scalars['Int']['output']>;
  twilioHistoryVideo?: Maybe<TwilioHistoryVideo>;
  twilioHistoryVideoId?: Maybe<Scalars['Int']['output']>;
  typeSocialNetwork: TypeSocialNetwork;
};

/** A segment of a collection. */
export type ConversationMessageCollectionSegment = {
  __typename?: 'ConversationMessageCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ConversationMessage>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type ConversationMessageFilterInput = {
  and?: InputMaybe<Array<ConversationMessageFilterInput>>;
  contactNetwork?: InputMaybe<ContactNetworkFilterInput>;
  contactNetworkId?: InputMaybe<IntOperationFilterInput>;
  conversation?: InputMaybe<ConversationFilterInput>;
  conversationAttachments?: InputMaybe<ListFilterInputTypeOfConversationAttachmentFilterInput>;
  conversationId?: InputMaybe<IntOperationFilterInput>;
  conversationMember?: InputMaybe<ConversationMemberFilterInput>;
  conversationMemberId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<LongOperationFilterInput>;
  isAttachment?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  /** This is a computed property and please avoid to use it in your where clause */
  isReplyTo?: InputMaybe<LongOperationFilterInput>;
  isSeen?: InputMaybe<BooleanOperationFilterInput>;
  isSentByContact?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  message?: InputMaybe<StringOperationFilterInput>;
  metaData?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ConversationMessageFilterInput>>;
  /** This is a computed property and please avoid to use it in your where clause */
  subject?: InputMaybe<StringOperationFilterInput>;
  /** This is a computed property and please avoid to use it in your where clause */
  summaryReplyMessage?: InputMaybe<StringOperationFilterInput>;
  twilioHistoryCall?: InputMaybe<TwilioHistoryCallFilterInput>;
  twilioHistoryCallId?: InputMaybe<IntOperationFilterInput>;
  twilioHistoryVideo?: InputMaybe<TwilioHistoryVideoFilterInput>;
  twilioHistoryVideoId?: InputMaybe<IntOperationFilterInput>;
  typeSocialNetwork?: InputMaybe<TypeSocialNetworkOperationFilterInput>;
};

export type ConversationMessageInput = {
  contactNetworkId?: InputMaybe<Scalars['Int']['input']>;
  conversationAttachments?: InputMaybe<Array<InputMaybe<ConversationAttachmentInput>>>;
  message?: InputMaybe<Scalars['String']['input']>;
  metaData?: InputMaybe<ConversationMessageMetaDataDtoInput>;
  twilioHistoryVideoId?: InputMaybe<Scalars['Int']['input']>;
};

export type ConversationMessageMetaDataDtoInput = {
  businessNetworkId: Scalars['Int']['input'];
  historyId?: InputMaybe<Scalars['String']['input']>;
  isReplyTo?: InputMaybe<Scalars['Long']['input']>;
  messageId?: InputMaybe<Scalars['String']['input']>;
  messageIdRFC2822?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  summaryReplyMessage?: InputMaybe<Scalars['String']['input']>;
  threadId?: InputMaybe<Scalars['String']['input']>;
};

export type ConversationMessageSortInput = {
  contactNetwork?: InputMaybe<ContactNetworkSortInput>;
  contactNetworkId?: InputMaybe<SortEnumType>;
  conversation?: InputMaybe<ConversationSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  conversationMember?: InputMaybe<ConversationMemberSortInput>;
  conversationMemberId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAttachment?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  /** This is a computed property and please avoid to use it in your where clause */
  isReplyTo?: InputMaybe<SortEnumType>;
  isSeen?: InputMaybe<SortEnumType>;
  isSentByContact?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  message?: InputMaybe<SortEnumType>;
  metaData?: InputMaybe<SortEnumType>;
  /** This is a computed property and please avoid to use it in your where clause */
  subject?: InputMaybe<SortEnumType>;
  /** This is a computed property and please avoid to use it in your where clause */
  summaryReplyMessage?: InputMaybe<SortEnumType>;
  twilioHistoryCall?: InputMaybe<TwilioHistoryCallSortInput>;
  twilioHistoryCallId?: InputMaybe<SortEnumType>;
  twilioHistoryVideo?: InputMaybe<TwilioHistoryVideoSortInput>;
  twilioHistoryVideoId?: InputMaybe<SortEnumType>;
  typeSocialNetwork?: InputMaybe<SortEnumType>;
};

export type ConversationSortInput = {
  business?: InputMaybe<BusinessSortInput>;
  businessId?: InputMaybe<SortEnumType>;
  contact?: InputMaybe<ContactSortInput>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isPinned?: InputMaybe<SortEnumType>;
  lastMessage?: InputMaybe<ConversationMessageSortInput>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  numberOfUnreadMessages?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export enum ConversationType {
  InternalChat = 'INTERNAL_CHAT',
  SocialNetworkChat = 'SOCIAL_NETWORK_CHAT',
  SupportChat = 'SUPPORT_CHAT'
}

export type ConversationTypeOperationFilterInput = {
  eq?: InputMaybe<ConversationType>;
  in?: InputMaybe<Array<ConversationType>>;
  neq?: InputMaybe<ConversationType>;
  nin?: InputMaybe<Array<ConversationType>>;
};

export type CreateCustomPackageInput = {
  agencyId?: InputMaybe<Scalars['Int']['input']>;
  businessId?: InputMaybe<Scalars['Int']['input']>;
  operatorCount: Scalars['Int']['input'];
  packageDuration: PackageDuration;
  totalPrice: Scalars['Decimal']['input'];
};

export type CreateSubscriptionInput = {
  cancelUrl?: InputMaybe<Scalars['String']['input']>;
  discount: Scalars['Decimal']['input'];
  operatorCount: Scalars['Int']['input'];
  planType: PlanType;
  successUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerStatusReportDto = {
  __typename?: 'CustomerStatusReportDto';
  appointmentScheduledCustomerCount: Scalars['Int']['output'];
  closedWonCustomerCount: Scalars['Int']['output'];
  leadCustomerCount: Scalars['Int']['output'];
  typeSocialNetwork: TypeSocialNetwork;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Deal = {
  __typename?: 'Deal';
  contact?: Maybe<Contact>;
  contactId: Scalars['Int']['output'];
  createdDate: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  creatorId: Scalars['Int']['output'];
  dealStatus: DealStatus;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  hubSpotDealId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  price: Scalars['Decimal']['output'];
  title?: Maybe<Scalars['String']['output']>;
  typeSocialNetwork?: Maybe<TypeSocialNetwork>;
};

/** A segment of a collection. */
export type DealCollectionSegment = {
  __typename?: 'DealCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Deal>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type DealFilterInput = {
  and?: InputMaybe<Array<DealFilterInput>>;
  contact?: InputMaybe<ContactFilterInput>;
  contactId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creator?: InputMaybe<UserFilterInput>;
  creatorId?: InputMaybe<IntOperationFilterInput>;
  dealStatus?: InputMaybe<DealStatusOperationFilterInput>;
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  hubSpotDealId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<DealFilterInput>>;
  price?: InputMaybe<DecimalOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  typeSocialNetwork?: InputMaybe<NullableOfTypeSocialNetworkOperationFilterInput>;
};

export type DealInput = {
  dealStatus?: InputMaybe<DealStatus>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type DealReportDto = {
  __typename?: 'DealReportDto';
  portionPercent: Scalars['Decimal']['output'];
  totalRevenue: Scalars['Decimal']['output'];
  typeSocialNetwork: TypeSocialNetwork;
};

export type DealSortInput = {
  contact?: InputMaybe<ContactSortInput>;
  contactId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  creator?: InputMaybe<UserSortInput>;
  creatorId?: InputMaybe<SortEnumType>;
  dealStatus?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  hubSpotDealId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  typeSocialNetwork?: InputMaybe<SortEnumType>;
};

export enum DealStatus {
  AppointmentScheduled = 'APPOINTMENT_SCHEDULED',
  ClosedWon = 'CLOSED_WON',
  Lead = 'LEAD',
  None = 'NONE'
}

export type DealStatusOperationFilterInput = {
  eq?: InputMaybe<DealStatus>;
  in?: InputMaybe<Array<DealStatus>>;
  neq?: InputMaybe<DealStatus>;
  nin?: InputMaybe<Array<DealStatus>>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export enum Direction {
  Inbound = 'INBOUND',
  Outbound = 'OUTBOUND'
}

export type DirectionOperationFilterInput = {
  eq?: InputMaybe<Direction>;
  in?: InputMaybe<Array<Direction>>;
  neq?: InputMaybe<Direction>;
  nin?: InputMaybe<Array<Direction>>;
};

export type FirebaseLoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type FirebaseUser = {
  __typename?: 'FirebaseUser';
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  isEmailVerified: Scalars['Boolean']['output'];
  localId?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
};

export type GmailAuthPayloadInput = {
  businessId: Scalars['Int']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type InternalConversationInput = {
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type InternalMessageInput = {
  conversationAttachments?: InputMaybe<Array<InputMaybe<ConversationAttachmentInput>>>;
  conversationId: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
};

export type LeadConversationDto = {
  __typename?: 'LeadConversationDto';
  conversationId: Scalars['Int']['output'];
  isLead: Scalars['Boolean']['output'];
};

export enum LineStatus {
  Active = 'ACTIVE',
  Away = 'AWAY'
}

export type LineStatusOperationFilterInput = {
  eq?: InputMaybe<LineStatus>;
  in?: InputMaybe<Array<LineStatus>>;
  neq?: InputMaybe<LineStatus>;
  nin?: InputMaybe<Array<LineStatus>>;
};

export type ListFilterInputTypeOfAgencyMemberAssignmentFilterInput = {
  all?: InputMaybe<AgencyMemberAssignmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AgencyMemberAssignmentFilterInput>;
  some?: InputMaybe<AgencyMemberAssignmentFilterInput>;
};

export type ListFilterInputTypeOfAgencyMemberFilterInput = {
  all?: InputMaybe<AgencyMemberFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AgencyMemberFilterInput>;
  some?: InputMaybe<AgencyMemberFilterInput>;
};

export type ListFilterInputTypeOfBusinessMemberFilterInput = {
  all?: InputMaybe<BusinessMemberFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BusinessMemberFilterInput>;
  some?: InputMaybe<BusinessMemberFilterInput>;
};

export type ListFilterInputTypeOfBusinessNetworkFilterInput = {
  all?: InputMaybe<BusinessNetworkFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<BusinessNetworkFilterInput>;
  some?: InputMaybe<BusinessNetworkFilterInput>;
};

export type ListFilterInputTypeOfCategoryFilterInput = {
  all?: InputMaybe<CategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CategoryFilterInput>;
  some?: InputMaybe<CategoryFilterInput>;
};

export type ListFilterInputTypeOfContactFilterInput = {
  all?: InputMaybe<ContactFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ContactFilterInput>;
  some?: InputMaybe<ContactFilterInput>;
};

export type ListFilterInputTypeOfContactNetworkFilterInput = {
  all?: InputMaybe<ContactNetworkFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ContactNetworkFilterInput>;
  some?: InputMaybe<ContactNetworkFilterInput>;
};

export type ListFilterInputTypeOfContactTagCategoryFilterInput = {
  all?: InputMaybe<ContactTagCategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ContactTagCategoryFilterInput>;
  some?: InputMaybe<ContactTagCategoryFilterInput>;
};

export type ListFilterInputTypeOfConversationAttachmentFilterInput = {
  all?: InputMaybe<ConversationAttachmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ConversationAttachmentFilterInput>;
  some?: InputMaybe<ConversationAttachmentFilterInput>;
};

export type ListFilterInputTypeOfConversationFilterInput = {
  all?: InputMaybe<ConversationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ConversationFilterInput>;
  some?: InputMaybe<ConversationFilterInput>;
};

export type ListFilterInputTypeOfConversationMemberFilterInput = {
  all?: InputMaybe<ConversationMemberFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ConversationMemberFilterInput>;
  some?: InputMaybe<ConversationMemberFilterInput>;
};

export type ListFilterInputTypeOfConversationMessageFilterInput = {
  all?: InputMaybe<ConversationMessageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ConversationMessageFilterInput>;
  some?: InputMaybe<ConversationMessageFilterInput>;
};

export type ListFilterInputTypeOfDealFilterInput = {
  all?: InputMaybe<DealFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<DealFilterInput>;
  some?: InputMaybe<DealFilterInput>;
};

export type ListFilterInputTypeOfNoteFilterInput = {
  all?: InputMaybe<NoteFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<NoteFilterInput>;
  some?: InputMaybe<NoteFilterInput>;
};

export type ListFilterInputTypeOfNotificationFilterInput = {
  all?: InputMaybe<NotificationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<NotificationFilterInput>;
  some?: InputMaybe<NotificationFilterInput>;
};

export type ListFilterInputTypeOfPaymentHistoryFilterInput = {
  all?: InputMaybe<PaymentHistoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PaymentHistoryFilterInput>;
  some?: InputMaybe<PaymentHistoryFilterInput>;
};

export type ListFilterInputTypeOfTagCategoryFilterInput = {
  all?: InputMaybe<TagCategoryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TagCategoryFilterInput>;
  some?: InputMaybe<TagCategoryFilterInput>;
};

export type ListFilterInputTypeOfTemplateFilterInput = {
  all?: InputMaybe<TemplateFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TemplateFilterInput>;
  some?: InputMaybe<TemplateFilterInput>;
};

export type ListFilterInputTypeOfTicketFilterInput = {
  all?: InputMaybe<TicketFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TicketFilterInput>;
  some?: InputMaybe<TicketFilterInput>;
};

export type ListFilterInputTypeOfTwilioHistoryCallFilterInput = {
  all?: InputMaybe<TwilioHistoryCallFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TwilioHistoryCallFilterInput>;
  some?: InputMaybe<TwilioHistoryCallFilterInput>;
};

export type ListFilterInputTypeOfTwilioHistoryVideoFilterInput = {
  all?: InputMaybe<TwilioHistoryVideoFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TwilioHistoryVideoFilterInput>;
  some?: InputMaybe<TwilioHistoryVideoFilterInput>;
};

export type ListResponseBaseAsyncOfAgencyAdminDto = {
  __typename?: 'ListResponseBaseAsyncOfAgencyAdminDto';
  result?: Maybe<AgencyAdminDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfAgencyAdminDtoResultArgs = {
  order?: InputMaybe<Array<AgencyAdminDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AgencyAdminDtoFilterInput>;
};

export type ListResponseBaseAsyncOfAgencyMember = {
  __typename?: 'ListResponseBaseAsyncOfAgencyMember';
  result?: Maybe<AgencyMemberCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfAgencyMemberResultArgs = {
  order?: InputMaybe<Array<AgencyMemberSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AgencyMemberFilterInput>;
};

export type ListResponseBaseAsyncOfAgencyMemberAssignment = {
  __typename?: 'ListResponseBaseAsyncOfAgencyMemberAssignment';
  result?: Maybe<AgencyMemberAssignmentCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfAgencyMemberAssignmentResultArgs = {
  order?: InputMaybe<Array<AgencyMemberAssignmentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AgencyMemberAssignmentFilterInput>;
};

export type ListResponseBaseAsyncOfBusiness = {
  __typename?: 'ListResponseBaseAsyncOfBusiness';
  result?: Maybe<BusinessCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfBusinessResultArgs = {
  order?: InputMaybe<Array<BusinessSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessFilterInput>;
};

export type ListResponseBaseAsyncOfBusinessAdminDto = {
  __typename?: 'ListResponseBaseAsyncOfBusinessAdminDto';
  result?: Maybe<BusinessAdminDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfBusinessAdminDtoResultArgs = {
  order?: InputMaybe<Array<BusinessAdminDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessAdminDtoFilterInput>;
};

export type ListResponseBaseAsyncOfBusinessColorTagDto = {
  __typename?: 'ListResponseBaseAsyncOfBusinessColorTagDto';
  result?: Maybe<BusinessColorTagDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfBusinessColorTagDtoResultArgs = {
  order?: InputMaybe<Array<BusinessColorTagDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessColorTagDtoFilterInput>;
};

export type ListResponseBaseAsyncOfBusinessMember = {
  __typename?: 'ListResponseBaseAsyncOfBusinessMember';
  result?: Maybe<BusinessMemberCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfBusinessMemberResultArgs = {
  order?: InputMaybe<Array<BusinessMemberSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessMemberFilterInput>;
};

export type ListResponseBaseAsyncOfBusinessNetwork = {
  __typename?: 'ListResponseBaseAsyncOfBusinessNetwork';
  result?: Maybe<BusinessNetworkCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfBusinessNetworkResultArgs = {
  order?: InputMaybe<Array<BusinessNetworkSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessNetworkFilterInput>;
};

export type ListResponseBaseAsyncOfCategory = {
  __typename?: 'ListResponseBaseAsyncOfCategory';
  result?: Maybe<CategoryCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfCategoryResultArgs = {
  order?: InputMaybe<Array<CategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryFilterInput>;
};

export type ListResponseBaseAsyncOfContact = {
  __typename?: 'ListResponseBaseAsyncOfContact';
  result?: Maybe<ContactCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfContactResultArgs = {
  order?: InputMaybe<Array<ContactSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactFilterInput>;
};

export type ListResponseBaseAsyncOfContactNetwork = {
  __typename?: 'ListResponseBaseAsyncOfContactNetwork';
  result?: Maybe<ContactNetworkCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfContactNetworkResultArgs = {
  order?: InputMaybe<Array<ContactNetworkSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactNetworkFilterInput>;
};

export type ListResponseBaseAsyncOfContactTagCategory = {
  __typename?: 'ListResponseBaseAsyncOfContactTagCategory';
  result?: Maybe<ContactTagCategoryCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfContactTagCategoryResultArgs = {
  order?: InputMaybe<Array<ContactTagCategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactTagCategoryFilterInput>;
};

export type ListResponseBaseAsyncOfConversation = {
  __typename?: 'ListResponseBaseAsyncOfConversation';
  result?: Maybe<ConversationCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfConversationResultArgs = {
  order?: InputMaybe<Array<ConversationSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationFilterInput>;
};

export type ListResponseBaseAsyncOfConversationMember = {
  __typename?: 'ListResponseBaseAsyncOfConversationMember';
  result?: Maybe<ConversationMemberCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfConversationMemberResultArgs = {
  order?: InputMaybe<Array<ConversationMemberSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationMemberFilterInput>;
};

export type ListResponseBaseAsyncOfConversationMessage = {
  __typename?: 'ListResponseBaseAsyncOfConversationMessage';
  result?: Maybe<ConversationMessageCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfConversationMessageResultArgs = {
  order?: InputMaybe<Array<ConversationMessageSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationMessageFilterInput>;
};

export type ListResponseBaseAsyncOfDeal = {
  __typename?: 'ListResponseBaseAsyncOfDeal';
  result?: Maybe<DealCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfDealResultArgs = {
  order?: InputMaybe<Array<DealSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DealFilterInput>;
};

export type ListResponseBaseAsyncOfNote = {
  __typename?: 'ListResponseBaseAsyncOfNote';
  result?: Maybe<NoteCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfNoteResultArgs = {
  order?: InputMaybe<Array<NoteSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NoteFilterInput>;
};

export type ListResponseBaseAsyncOfNotification = {
  __typename?: 'ListResponseBaseAsyncOfNotification';
  result?: Maybe<NotificationCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfNotificationResultArgs = {
  order?: InputMaybe<Array<NotificationSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type ListResponseBaseAsyncOfPaymentHistory = {
  __typename?: 'ListResponseBaseAsyncOfPaymentHistory';
  result?: Maybe<PaymentHistoryCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfPaymentHistoryResultArgs = {
  order?: InputMaybe<Array<PaymentHistorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PaymentHistoryFilterInput>;
};

export type ListResponseBaseAsyncOfTagCategory = {
  __typename?: 'ListResponseBaseAsyncOfTagCategory';
  result?: Maybe<TagCategoryCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfTagCategoryResultArgs = {
  order?: InputMaybe<Array<TagCategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TagCategoryFilterInput>;
};

export type ListResponseBaseAsyncOfTemplate = {
  __typename?: 'ListResponseBaseAsyncOfTemplate';
  result?: Maybe<TemplateCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfTemplateResultArgs = {
  order?: InputMaybe<Array<TemplateSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TemplateFilterInput>;
};

export type ListResponseBaseAsyncOfTicket = {
  __typename?: 'ListResponseBaseAsyncOfTicket';
  result?: Maybe<TicketCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfTicketResultArgs = {
  order?: InputMaybe<Array<TicketSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TicketFilterInput>;
};

export type ListResponseBaseAsyncOfTwilioHistoryCall = {
  __typename?: 'ListResponseBaseAsyncOfTwilioHistoryCall';
  result?: Maybe<TwilioHistoryCallCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfTwilioHistoryCallResultArgs = {
  order?: InputMaybe<Array<TwilioHistoryCallSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TwilioHistoryCallFilterInput>;
};

export type ListResponseBaseAsyncOfTwilioHistoryVideo = {
  __typename?: 'ListResponseBaseAsyncOfTwilioHistoryVideo';
  result?: Maybe<TwilioHistoryVideoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfTwilioHistoryVideoResultArgs = {
  order?: InputMaybe<Array<TwilioHistoryVideoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TwilioHistoryVideoFilterInput>;
};

export type ListResponseBaseAsyncOfTwilioPhoneNumber = {
  __typename?: 'ListResponseBaseAsyncOfTwilioPhoneNumber';
  result?: Maybe<TwilioPhoneNumberCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfTwilioPhoneNumberResultArgs = {
  order?: InputMaybe<Array<TwilioPhoneNumberSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TwilioPhoneNumberFilterInput>;
};

export type ListResponseBaseAsyncOfUnseenMessagesByTypeDto = {
  __typename?: 'ListResponseBaseAsyncOfUnseenMessagesByTypeDto';
  result?: Maybe<UnseenMessagesByTypeDtoCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfUnseenMessagesByTypeDtoResultArgs = {
  order?: InputMaybe<Array<UnseenMessagesByTypeDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UnseenMessagesByTypeDtoFilterInput>;
};

export type ListResponseBaseAsyncOfUser = {
  __typename?: 'ListResponseBaseAsyncOfUser';
  result?: Maybe<UserCollectionSegment>;
  status?: Maybe<Scalars['Any']['output']>;
};


export type ListResponseBaseAsyncOfUserResultArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
};

export type LongOperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
  ngt?: InputMaybe<Scalars['Long']['input']>;
  ngte?: InputMaybe<Scalars['Long']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  nlt?: InputMaybe<Scalars['Long']['input']>;
  nlte?: InputMaybe<Scalars['Long']['input']>;
};

export type MemberAccessDto = {
  __typename?: 'MemberAccessDto';
  isManageAgencyUserAccess: Scalars['Boolean']['output'];
  isManageBusinessUserAccess: Scalars['Boolean']['output'];
  isOpratorAccess: Scalars['Boolean']['output'];
  isReportAccess: Scalars['Boolean']['output'];
  isSettingsManagmentAccess: Scalars['Boolean']['output'];
  isSocialManagmentAccess: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  agencyMember_addAssignmentToBusiness?: Maybe<ResponseBaseOfAgencyMemberAssignment>;
  agencyMember_businessConnectionRequest?: Maybe<ResponseBaseOfAgencyMemberAssignment>;
  agencyMember_edit?: Maybe<ResponseBaseOfAgencyMember>;
  agencyMember_editAssignmentToBusiness?: Maybe<ResponseBaseOfAgencyMemberAssignment>;
  agencyMember_signUpMember?: Maybe<ResponseBaseOfAgencyMember>;
  agencyMember_signUpOwner?: Maybe<ResponseBaseOfAgencyMember>;
  agency_edit?: Maybe<ResponseBaseOfAgency>;
  agency_editByAdmin?: Maybe<ResponseBaseOfAgency>;
  businessConnectionRequest_accepted?: Maybe<ResponseBaseOfAgencyMemberAssignment>;
  businessConnectionRequest_canceled?: Maybe<ResponseBaseOfAgencyMemberAssignment>;
  businessConnectionRequest_editTagColor?: Maybe<ResponseBaseOfAgencyMemberAssignment>;
  businessConnectionRequest_rejected?: Maybe<ResponseBaseOfAgencyMemberAssignment>;
  businessMember_edit?: Maybe<ResponseBaseOfBusinessMember>;
  businessMember_signUpMember?: Maybe<ResponseBaseOfBusinessMember>;
  businessMember_signUpOwner?: Maybe<ResponseBaseOfBusinessMember>;
  business_edit?: Maybe<ResponseBaseOfBusiness>;
  business_editByAdmin?: Maybe<ResponseBaseOfBusiness>;
  business_setGmailAuthCode?: Maybe<ResponseBaseOfBoolean>;
  business_setTwilioPhoneNumber?: Maybe<ResponseBaseOfBusiness>;
  category_add?: Maybe<ResponseBaseOfCategory>;
  category_delete?: Maybe<ResponseBase>;
  category_edit?: Maybe<ResponseBaseOfCategory>;
  contactNetwork_deleteById?: Maybe<ResponseBase>;
  contactTagCategory_add?: Maybe<ResponseBaseOfContactTagCategory>;
  contactTagCategory_delete?: Maybe<ResponseBase>;
  contactTagCategory_edit?: Maybe<ResponseBaseOfContactTagCategory>;
  contact_add?: Maybe<ResponseBaseOfContact>;
  contact_edit?: Maybe<ResponseBaseOfContact>;
  contact_fetchOrCreateByContact?: Maybe<ResponseBaseOfContact>;
  contact_mergeContact?: Maybe<ResponseBase>;
  conversationMember_add?: Maybe<ResponseBaseOfConversationMember>;
  conversationMember_addList?: Maybe<ResponseBase>;
  conversationMessage_sendMessageToGmail?: Maybe<ResponseBaseOfConversationMessage>;
  conversationMessage_setSeenStatus?: Maybe<ResponseBase>;
  conversation_edit?: Maybe<ResponseBaseOfConversation>;
  conversation_fetchOrCreate?: Maybe<ResponseBaseOfConversation>;
  conversation_fetchOrCreateByContact?: Maybe<ResponseBaseOfConversation>;
  deal_add?: Maybe<ResponseBaseOfDeal>;
  deal_delete?: Maybe<ResponseBase>;
  deal_edit?: Maybe<ResponseBaseOfDeal>;
  firebase_getTokenByRefreshToken?: Maybe<ResponseBaseOfAuthResult>;
  firebase_login?: Maybe<ResponseBaseOfAuthResult>;
  hubSpot_setByBusinessId?: Maybe<ResponseBase>;
  hubSpot_syncSingleContactWithHubSpot?: Maybe<ResponseBase>;
  internalChat_addInternalConversation?: Maybe<ResponseBaseOfConversation>;
  internalChat_addInternalMessage?: Maybe<ResponseBaseOfConversationMessage>;
  liveChat_sendMessageByContact?: Maybe<ResponseBaseOfConversationMessage>;
  liveChat_sendMessageByMember?: Maybe<ResponseBaseOfConversationMessage>;
  note_add?: Maybe<ResponseBaseOfNote>;
  note_delete?: Maybe<ResponseBase>;
  note_edit?: Maybe<ResponseBaseOfNote>;
  notification_setReadStatus?: Maybe<ResponseBase>;
  payment_cancelSubscription?: Maybe<ResponseBase>;
  payment_createCustomPackage?: Maybe<ResponseBaseOfPaymentHistory>;
  payment_createPaymentIntentForCustomPackage?: Maybe<ResponseBaseOfPaymentIntentDto>;
  payment_createSubscription?: Maybe<ResponseBaseOfString>;
  payment_modifyOperatorCount?: Maybe<ResponseBase>;
  payment_removeCustomPackage?: Maybe<ResponseBase>;
  supportChat_addSupportMessage?: Maybe<ResponseBaseOfConversationMessage>;
  supportChat_addSupportMessageByAdmin?: Maybe<ResponseBaseOfConversationMessage>;
  supportChat_addSupportSurvey?: Maybe<ResponseBaseOfConversationMessage>;
  tagCategory_add?: Maybe<ResponseBaseOfTagCategory>;
  tagCategory_delete?: Maybe<ResponseBase>;
  tagCategory_edit?: Maybe<ResponseBaseOfTagCategory>;
  template_add?: Maybe<ResponseBaseOfTemplate>;
  template_delete?: Maybe<ResponseBase>;
  template_edit?: Maybe<ResponseBaseOfTemplate>;
  ticket_add?: Maybe<ResponseBaseOfTicket>;
  ticket_delete?: Maybe<ResponseBase>;
  ticket_edit?: Maybe<ResponseBaseOfTicket>;
  twilio_addPhoneNumber?: Maybe<ResponseBaseOfTwilioPhoneNumber>;
  twilio_answerCallByCallSid?: Maybe<ResponseBase>;
  twilio_deletePhoneNumber?: Maybe<ResponseBase>;
  twilio_editPhoneNumber?: Maybe<ResponseBaseOfTwilioPhoneNumber>;
  twilio_generateVideoRoom?: Maybe<ResponseBaseOfTwilioHistoryVideo>;
  twilio_getVideoRoomToken?: Maybe<ResponseBaseOfString>;
  twilio_holdCallByCallSid?: Maybe<ResponseBase>;
  twilio_rejectCallByCallSid?: Maybe<ResponseBase>;
  twilio_sendSms?: Maybe<ResponseBase>;
  twilio_unHoldCallByCallSid?: Maybe<ResponseBase>;
  twilio_voiceCallRequest?: Maybe<ResponseBaseOfConversationMessage>;
  user_changePassword?: Maybe<ResponseBase>;
  user_editProfile?: Maybe<ResponseBaseOfUser>;
  user_exchangeCalendarAuthCodeForTokens?: Maybe<ResponseBaseOfCalendarAccessTokenDto>;
};


export type MutationAgencyMember_AddAssignmentToBusinessArgs = {
  agencyMemberId: Scalars['Int']['input'];
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<AgencyMemberAssignmentInput>;
};


export type MutationAgencyMember_BusinessConnectionRequestArgs = {
  businessId: Scalars['Int']['input'];
  colorTag: ColorTagType;
};


export type MutationAgencyMember_EditArgs = {
  agencyMemberId: Scalars['Int']['input'];
  input?: InputMaybe<AgencyMemberInput>;
};


export type MutationAgencyMember_EditAssignmentToBusinessArgs = {
  agencyMemberAssignmentId: Scalars['Int']['input'];
  input?: InputMaybe<AgencyMemberAssignmentInput>;
};


export type MutationAgencyMember_SignUpMemberArgs = {
  input?: InputMaybe<AgencyMemberInput>;
};


export type MutationAgencyMember_SignUpOwnerArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationAgency_EditArgs = {
  agencyId: Scalars['Int']['input'];
  input?: InputMaybe<AgencyInput>;
};


export type MutationAgency_EditByAdminArgs = {
  agencyId: Scalars['Int']['input'];
  input?: InputMaybe<AgencyAdminInput>;
};


export type MutationBusinessConnectionRequest_AcceptedArgs = {
  entityId: Scalars['Int']['input'];
};


export type MutationBusinessConnectionRequest_CanceledArgs = {
  entityId: Scalars['Int']['input'];
};


export type MutationBusinessConnectionRequest_EditTagColorArgs = {
  colorTag: ColorTagType;
  entityId: Scalars['Int']['input'];
};


export type MutationBusinessConnectionRequest_RejectedArgs = {
  entityId: Scalars['Int']['input'];
};


export type MutationBusinessMember_EditArgs = {
  businessMemberId: Scalars['Int']['input'];
  input?: InputMaybe<BusinessMemberInput>;
};


export type MutationBusinessMember_SignUpMemberArgs = {
  input?: InputMaybe<BusinessMemberInput>;
};


export type MutationBusinessMember_SignUpOwnerArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationBusiness_EditArgs = {
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<BusinessInput>;
};


export type MutationBusiness_EditByAdminArgs = {
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<BusinessAdminInput>;
};


export type MutationBusiness_SetGmailAuthCodeArgs = {
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<GmailAuthPayloadInput>;
};


export type MutationBusiness_SetTwilioPhoneNumberArgs = {
  businessId: Scalars['Int']['input'];
  twilioPhoneNumberId: Scalars['Int']['input'];
};


export type MutationCategory_AddArgs = {
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<CategoryInput>;
};


export type MutationCategory_DeleteArgs = {
  categoryId: Scalars['Int']['input'];
};


export type MutationCategory_EditArgs = {
  categoryId: Scalars['Int']['input'];
  input?: InputMaybe<CategoryInput>;
};


export type MutationContactNetwork_DeleteByIdArgs = {
  contactNetworkId: Scalars['Int']['input'];
};


export type MutationContactTagCategory_AddArgs = {
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<ContactTagCategoryInput>;
};


export type MutationContactTagCategory_DeleteArgs = {
  contactTagCategoryId: Scalars['Int']['input'];
};


export type MutationContactTagCategory_EditArgs = {
  contactTagCategoryId: Scalars['Int']['input'];
  input?: InputMaybe<ContactTagCategoryInput>;
};


export type MutationContact_AddArgs = {
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<ContactInput>;
};


export type MutationContact_EditArgs = {
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<ContactInput>;
};


export type MutationContact_FetchOrCreateByContactArgs = {
  businessKey?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<StartLiveChatInput>;
};


export type MutationContact_MergeContactArgs = {
  fromContactId: Scalars['Int']['input'];
  toContactId: Scalars['Int']['input'];
};


export type MutationConversationMember_AddArgs = {
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<ConversationMemberInput>;
};


export type MutationConversationMember_AddListArgs = {
  conversationId: Scalars['Int']['input'];
  users?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationConversationMessage_SendMessageToGmailArgs = {
  input?: InputMaybe<SendGmailInput>;
};


export type MutationConversationMessage_SetSeenStatusArgs = {
  ints?: InputMaybe<Array<Scalars['Long']['input']>>;
};


export type MutationConversation_EditArgs = {
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<ConversationInput>;
};


export type MutationConversation_FetchOrCreateArgs = {
  businessKey?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ConversationInput>;
};


export type MutationConversation_FetchOrCreateByContactArgs = {
  businessKey?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ConversationInput>;
};


export type MutationDeal_AddArgs = {
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<DealInput>;
};


export type MutationDeal_DeleteArgs = {
  dealId: Scalars['Int']['input'];
};


export type MutationDeal_EditArgs = {
  dealId: Scalars['Int']['input'];
  input?: InputMaybe<DealInput>;
};


export type MutationFirebase_GetTokenByRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFirebase_LoginArgs = {
  input?: InputMaybe<FirebaseLoginInput>;
};


export type MutationHubSpot_SetByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  redirectLink?: InputMaybe<Scalars['String']['input']>;
};


export type MutationHubSpot_SyncSingleContactWithHubSpotArgs = {
  businessId: Scalars['Int']['input'];
  contactId: Scalars['Int']['input'];
};


export type MutationInternalChat_AddInternalConversationArgs = {
  internalConveInput?: InputMaybe<InternalConversationInput>;
};


export type MutationInternalChat_AddInternalMessageArgs = {
  internalMessageInput?: InputMaybe<InternalMessageInput>;
};


export type MutationLiveChat_SendMessageByContactArgs = {
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<ConversationMessageInput>;
};


export type MutationLiveChat_SendMessageByMemberArgs = {
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<ConversationMessageInput>;
};


export type MutationNote_AddArgs = {
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<NoteInput>;
};


export type MutationNote_DeleteArgs = {
  noteId: Scalars['Int']['input'];
};


export type MutationNote_EditArgs = {
  input?: InputMaybe<NoteInput>;
  noteId: Scalars['Int']['input'];
};


export type MutationNotification_SetReadStatusArgs = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type MutationPayment_CreateCustomPackageArgs = {
  input?: InputMaybe<CreateCustomPackageInput>;
};


export type MutationPayment_CreatePaymentIntentForCustomPackageArgs = {
  packageId: Scalars['Int']['input'];
};


export type MutationPayment_CreateSubscriptionArgs = {
  input?: InputMaybe<CreateSubscriptionInput>;
};


export type MutationPayment_ModifyOperatorCountArgs = {
  quantity: Scalars['Int']['input'];
};


export type MutationPayment_RemoveCustomPackageArgs = {
  packageId: Scalars['Int']['input'];
};


export type MutationSupportChat_AddSupportMessageArgs = {
  supportMessageInput?: InputMaybe<SupportMessageInput>;
};


export type MutationSupportChat_AddSupportMessageByAdminArgs = {
  conversationId: Scalars['Int']['input'];
  supportMessageInput?: InputMaybe<SupportMessageInput>;
};


export type MutationSupportChat_AddSupportSurveyArgs = {
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<SupportChatSurveyDtoInput>;
};


export type MutationTagCategory_AddArgs = {
  categoryId: Scalars['Int']['input'];
  input?: InputMaybe<TagCategoryInput>;
};


export type MutationTagCategory_DeleteArgs = {
  tagCategoryId: Scalars['Int']['input'];
};


export type MutationTagCategory_EditArgs = {
  input?: InputMaybe<TagCategoryInput>;
  tagCategoryId: Scalars['Int']['input'];
};


export type MutationTemplate_AddArgs = {
  categoryId: Scalars['Int']['input'];
  input?: InputMaybe<TemplateInput>;
};


export type MutationTemplate_DeleteArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationTemplate_EditArgs = {
  input?: InputMaybe<TemplateInput>;
  templateId: Scalars['Int']['input'];
};


export type MutationTicket_AddArgs = {
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<TicketInput>;
};


export type MutationTicket_DeleteArgs = {
  ticketId: Scalars['Int']['input'];
};


export type MutationTicket_EditArgs = {
  input?: InputMaybe<TicketInput>;
  ticketId: Scalars['Int']['input'];
};


export type MutationTwilio_AddPhoneNumberArgs = {
  input?: InputMaybe<TwilioPhoneNumberInput>;
};


export type MutationTwilio_AnswerCallByCallSidArgs = {
  callSid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTwilio_DeletePhoneNumberArgs = {
  twilioPhoneNumberId: Scalars['Int']['input'];
};


export type MutationTwilio_EditPhoneNumberArgs = {
  input?: InputMaybe<TwilioPhoneNumberInput>;
  twilioPhoneNumberId: Scalars['Int']['input'];
};


export type MutationTwilio_GetVideoRoomTokenArgs = {
  identity?: InputMaybe<Scalars['String']['input']>;
  roomName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTwilio_HoldCallByCallSidArgs = {
  callSid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTwilio_RejectCallByCallSidArgs = {
  callSid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTwilio_SendSmsArgs = {
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<SendSmsInput>;
};


export type MutationTwilio_UnHoldCallByCallSidArgs = {
  callSid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTwilio_VoiceCallRequestArgs = {
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<VoiceCallRequestInput>;
};


export type MutationUser_ChangePasswordArgs = {
  currentPassword?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUser_EditProfileArgs = {
  input?: InputMaybe<UserProfileInput>;
};


export type MutationUser_ExchangeCalendarAuthCodeForTokensArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
};

export type MutualReportInput = {
  businessId: Scalars['Int']['input'];
  timeFrame: ReportTimeFrame;
};

export type Note = {
  __typename?: 'Note';
  contact?: Maybe<Contact>;
  contactId: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type NoteCollectionSegment = {
  __typename?: 'NoteCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Note>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type NoteFilterInput = {
  and?: InputMaybe<Array<NoteFilterInput>>;
  contact?: InputMaybe<ContactFilterInput>;
  contactId?: InputMaybe<IntOperationFilterInput>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<NoteFilterInput>>;
};

export type NoteInput = {
  content?: InputMaybe<Scalars['String']['input']>;
};

export type NoteSortInput = {
  contact?: InputMaybe<ContactSortInput>;
  contactId?: InputMaybe<SortEnumType>;
  content?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
};

export type Notification = {
  __typename?: 'Notification';
  content?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isSeen: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  type: NotificationType;
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type NotificationCollectionSegment = {
  __typename?: 'NotificationCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Notification>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type NotificationFilterInput = {
  and?: InputMaybe<Array<NotificationFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isSeen?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  message?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<NotificationFilterInput>>;
  type?: InputMaybe<NotificationTypeOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
};

export type NotificationSortInput = {
  content?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isSeen?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  message?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum NotificationType {
  AssignMemberToConversation = 'ASSIGN_MEMBER_TO_CONVERSATION',
  Ticket = 'TICKET'
}

export type NotificationTypeOperationFilterInput = {
  eq?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  neq?: InputMaybe<NotificationType>;
  nin?: InputMaybe<Array<NotificationType>>;
};

export type NullableOfColorTagTypeOperationFilterInput = {
  eq?: InputMaybe<ColorTagType>;
  in?: InputMaybe<Array<InputMaybe<ColorTagType>>>;
  neq?: InputMaybe<ColorTagType>;
  nin?: InputMaybe<Array<InputMaybe<ColorTagType>>>;
};

export type NullableOfDealStatusOperationFilterInput = {
  eq?: InputMaybe<DealStatus>;
  in?: InputMaybe<Array<InputMaybe<DealStatus>>>;
  neq?: InputMaybe<DealStatus>;
  nin?: InputMaybe<Array<InputMaybe<DealStatus>>>;
};

export type NullableOfPackageDurationOperationFilterInput = {
  eq?: InputMaybe<PackageDuration>;
  in?: InputMaybe<Array<InputMaybe<PackageDuration>>>;
  neq?: InputMaybe<PackageDuration>;
  nin?: InputMaybe<Array<InputMaybe<PackageDuration>>>;
};

export type NullableOfTypeSocialNetworkOperationFilterInput = {
  eq?: InputMaybe<TypeSocialNetwork>;
  in?: InputMaybe<Array<InputMaybe<TypeSocialNetwork>>>;
  neq?: InputMaybe<TypeSocialNetwork>;
  nin?: InputMaybe<Array<InputMaybe<TypeSocialNetwork>>>;
};

export enum PackageDuration {
  LifeTime = 'LIFE_TIME',
  OneMonth = 'ONE_MONTH',
  SixMonth = 'SIX_MONTH',
  ThreeMonth = 'THREE_MONTH',
  Year = 'YEAR'
}

export type PaymentHistory = {
  __typename?: 'PaymentHistory';
  createdDate: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  creatorId?: Maybe<Scalars['Int']['output']>;
  discount: Scalars['Decimal']['output'];
  expireDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  invoiceId?: Maybe<Scalars['String']['output']>;
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  operatorCount?: Maybe<Scalars['Int']['output']>;
  owner?: Maybe<User>;
  ownerId: Scalars['Int']['output'];
  packageDuration?: Maybe<PackageDuration>;
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;
  subscriptionId?: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Decimal']['output'];
};

/** A segment of a collection. */
export type PaymentHistoryCollectionSegment = {
  __typename?: 'PaymentHistoryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PaymentHistory>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaymentHistoryFilterInput = {
  and?: InputMaybe<Array<PaymentHistoryFilterInput>>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creator?: InputMaybe<UserFilterInput>;
  creatorId?: InputMaybe<IntOperationFilterInput>;
  discount?: InputMaybe<DecimalOperationFilterInput>;
  expireDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  invoiceId?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  operatorCount?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<PaymentHistoryFilterInput>>;
  owner?: InputMaybe<UserFilterInput>;
  ownerId?: InputMaybe<IntOperationFilterInput>;
  packageDuration?: InputMaybe<NullableOfPackageDurationOperationFilterInput>;
  paymentStatus?: InputMaybe<PaymentStatusOperationFilterInput>;
  paymentType?: InputMaybe<PaymentTypeOperationFilterInput>;
  subscriptionId?: InputMaybe<StringOperationFilterInput>;
  totalPrice?: InputMaybe<DecimalOperationFilterInput>;
};

export type PaymentHistorySortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  creator?: InputMaybe<UserSortInput>;
  creatorId?: InputMaybe<SortEnumType>;
  discount?: InputMaybe<SortEnumType>;
  expireDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  invoiceId?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  operatorCount?: InputMaybe<SortEnumType>;
  owner?: InputMaybe<UserSortInput>;
  ownerId?: InputMaybe<SortEnumType>;
  packageDuration?: InputMaybe<SortEnumType>;
  paymentStatus?: InputMaybe<SortEnumType>;
  paymentType?: InputMaybe<SortEnumType>;
  subscriptionId?: InputMaybe<SortEnumType>;
  totalPrice?: InputMaybe<SortEnumType>;
};

export type PaymentIntentDto = {
  __typename?: 'PaymentIntentDto';
  clientSecret?: Maybe<Scalars['String']['output']>;
  publishKey?: Maybe<Scalars['String']['output']>;
};

export type PaymentReportDto = {
  __typename?: 'PaymentReportDto';
  timeUnit: Scalars['Int']['output'];
  totalPayment: Scalars['Decimal']['output'];
};

export enum PaymentStatus {
  Failed = 'FAILED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type PaymentStatusOperationFilterInput = {
  eq?: InputMaybe<PaymentStatus>;
  in?: InputMaybe<Array<PaymentStatus>>;
  neq?: InputMaybe<PaymentStatus>;
  nin?: InputMaybe<Array<PaymentStatus>>;
};

export enum PaymentType {
  ActiveSubscription = 'ACTIVE_SUBSCRIPTION',
  CanceledSubscription = 'CANCELED_SUBSCRIPTION',
  Intent = 'INTENT'
}

export type PaymentTypeOperationFilterInput = {
  eq?: InputMaybe<PaymentType>;
  in?: InputMaybe<Array<PaymentType>>;
  neq?: InputMaybe<PaymentType>;
  nin?: InputMaybe<Array<PaymentType>>;
};

export enum PermissionType {
  AgencyMember = 'AGENCY_MEMBER',
  AgencyOwner = 'AGENCY_OWNER',
  BusinessMember = 'BUSINESS_MEMBER',
  BusinessOwner = 'BUSINESS_OWNER',
  ManageAgencyUser = 'MANAGE_AGENCY_USER',
  ManageBusinessUser = 'MANAGE_BUSINESS_USER',
  None = 'NONE',
  OpratorAccess = 'OPRATOR_ACCESS',
  Report = 'REPORT',
  SettingsManagment = 'SETTINGS_MANAGMENT',
  SocialManagment = 'SOCIAL_MANAGMENT',
  Subscription = 'SUBSCRIPTION'
}

export enum PlanType {
  Annually = 'ANNUALLY',
  Monthly = 'MONTHLY'
}

export type Query = {
  __typename?: 'Query';
  Twilio_getListPhoneNumber?: Maybe<ListResponseBaseAsyncOfTwilioPhoneNumber>;
  Twilio_getPhoneNumberByBusinessId?: Maybe<SingleResponseBaseAsyncOfTwilioPhoneNumber>;
  agencyMember_getBusinessColorTags?: Maybe<ListResponseBaseAsyncOfBusinessColorTagDto>;
  agencyMember_getList?: Maybe<ListResponseBaseAsyncOfAgencyMember>;
  agencyMember_getListAssignment?: Maybe<ListResponseBaseAsyncOfAgencyMemberAssignment>;
  agency_getAccountState?: Maybe<ResponseBaseOfAccountStateDto>;
  agency_getDetailsByAdmin?: Maybe<ResponseBaseOfAgencyAdminDetailsDto>;
  agency_getListByAdmin?: Maybe<ListResponseBaseAsyncOfAgencyAdminDto>;
  agency_getMemberTeam?: Maybe<ResponseBaseOfAgencyTeamDto>;
  businessMember_getList?: Maybe<ListResponseBaseAsyncOfBusinessMember>;
  businessNetwork_getByBusinessId?: Maybe<ListResponseBaseAsyncOfBusinessNetwork>;
  business_getAccountState?: Maybe<ResponseBaseOfAccountStateDto>;
  business_getByBusinessId?: Maybe<SingleResponseBaseAsyncOfBusiness>;
  business_getDetailsByAdmin?: Maybe<SingleResponseBaseAsyncOfBusinessAdminDetailsDto>;
  business_getGmailAuthLink?: Maybe<ResponseBaseOfString>;
  business_getList?: Maybe<ListResponseBaseAsyncOfBusiness>;
  business_getListAgencyRequests?: Maybe<ListResponseBaseAsyncOfAgencyMemberAssignment>;
  business_getListByAdmin?: Maybe<ListResponseBaseAsyncOfBusinessAdminDto>;
  business_getTeamByBusinessId?: Maybe<ListResponseBaseAsyncOfUser>;
  category_getList?: Maybe<ListResponseBaseAsyncOfCategory>;
  contactNetwork_getListByContactId?: Maybe<ListResponseBaseAsyncOfContactNetwork>;
  contactTagCategory_getListByContactId?: Maybe<ListResponseBaseAsyncOfContactTagCategory>;
  contact_getByContactId?: Maybe<ResponseBaseOfContact>;
  contact_getContactByContactNetwork?: Maybe<ResponseBaseOfContact>;
  contact_getListByBusinessId?: Maybe<ListResponseBaseAsyncOfContact>;
  conversationMember_getListByConversationId?: Maybe<ListResponseBaseAsyncOfConversationMember>;
  conversationMessage_getByConversationId?: Maybe<ListResponseBaseAsyncOfConversationMessage>;
  conversation_getByBusinessId?: Maybe<ListResponseBaseAsyncOfConversation>;
  conversation_getConversationByContactId?: Maybe<SingleResponseBaseAsyncOfConversation>;
  conversation_getConversationById?: Maybe<SingleResponseBaseAsyncOfConversation>;
  conversation_getList?: Maybe<ListResponseBaseAsyncOfConversation>;
  conversation_getUnseenMessagesByType?: Maybe<ListResponseBaseAsyncOfUnseenMessagesByTypeDto>;
  deal_getListByBusinessId?: Maybe<ListResponseBaseAsyncOfDeal>;
  deal_getListByContactId?: Maybe<ListResponseBaseAsyncOfDeal>;
  hubSpot_getAuthLink?: Maybe<ResponseBaseOfString>;
  note_getListByContactId?: Maybe<ListResponseBaseAsyncOfNote>;
  notification_getById?: Maybe<SingleResponseBaseAsyncOfNotification>;
  notification_getList?: Maybe<ListResponseBaseAsyncOfNotification>;
  paymentHistory_checkActiveSubscription?: Maybe<ResponseBaseOfBoolean>;
  paymentHistory_getList?: Maybe<ListResponseBaseAsyncOfPaymentHistory>;
  payment_calculateSubscription?: Maybe<ResponseBaseOfCalculateSubscriptionCostDto>;
  payment_cancelingSubscriptionCost?: Maybe<ResponseBaseOfDecimal>;
  payment_operatorModificationCost?: Maybe<ResponseBaseOfCalculateOperatorModificationDto>;
  report_getAverageTimeOnHoldReport?: Maybe<ResponseBaseOfListOfAverageTimeOnHoldDto>;
  report_getBestConversionChannel?: Maybe<ResponseBaseOfListOfDealReportDto>;
  report_getConversationAvgResponseTimeReport?: Maybe<ResponseBaseOfListOfConversationAvgResponseTimeDto>;
  report_getCustomerStatusReport?: Maybe<ResponseBaseOfListOfCustomerStatusReportDto>;
  report_getPaymentReport?: Maybe<ResponseBaseOfListOfPaymentReportDto>;
  report_getPendingConversationReport?: Maybe<ResponseBaseOfListOfLeadConversationDto>;
  report_getTagCategoryReport?: Maybe<ResponseBaseOfListOfTagCategoryReportDto>;
  report_getTeamPerformanceOnDealReport?: Maybe<ResponseBaseOfListOfTeamMemberPerformanceOnDealDto>;
  report_getTicketReport?: Maybe<ResponseBaseOfListOfTicketReportDto>;
  report_getTwilioCallReport?: Maybe<ResponseBaseOfListOfTwilioCallReportDto>;
  supportChat_getList?: Maybe<ListResponseBaseAsyncOfConversation>;
  tagCategory_getListByBusinessId?: Maybe<ListResponseBaseAsyncOfTagCategory>;
  tagCategory_getListByCategoryId?: Maybe<ListResponseBaseAsyncOfTagCategory>;
  template_getListByBusinessId?: Maybe<ListResponseBaseAsyncOfTemplate>;
  template_getListByCategoryId?: Maybe<ListResponseBaseAsyncOfTemplate>;
  ticket_getListByBusinessId?: Maybe<ListResponseBaseAsyncOfTicket>;
  twilio_getCallToken?: Maybe<ResponseBaseOfCallTokenDto>;
  twilio_getHistoryCallsByBusinessId?: Maybe<ListResponseBaseAsyncOfTwilioHistoryCall>;
  twilio_getHistoryVideosByBusinessId?: Maybe<ListResponseBaseAsyncOfTwilioHistoryVideo>;
  user_getAccountStatus?: Maybe<ResponseBase>;
  user_getCalendarAccessToken?: Maybe<ResponseBaseOfString>;
  user_getCalendarAuthLink?: Maybe<ResponseBaseOfString>;
  user_getCurrentUser?: Maybe<ResponseBaseOfUserDto>;
  user_isUserExistByEmail?: Maybe<ResponseBase>;
};


export type QueryTwilio_GetPhoneNumberByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryAgencyMember_GetListAssignmentArgs = {
  businessId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAgency_GetDetailsByAdminArgs = {
  agencyId: Scalars['Int']['input'];
};


export type QueryAgency_GetMemberTeamArgs = {
  permissionType?: InputMaybe<PermissionType>;
};


export type QueryBusinessNetwork_GetByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryBusiness_GetByBusinessIdArgs = {
  businessId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBusiness_GetDetailsByAdminArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryBusiness_GetGmailAuthLinkArgs = {
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBusiness_GetListAgencyRequestsArgs = {
  businessId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBusiness_GetTeamByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
  permissionType?: InputMaybe<PermissionType>;
};


export type QueryCategory_GetListArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryContactNetwork_GetListByContactIdArgs = {
  contactId: Scalars['Int']['input'];
};


export type QueryContactTagCategory_GetListByContactIdArgs = {
  contactId: Scalars['Int']['input'];
};


export type QueryContact_GetByContactIdArgs = {
  contactId: Scalars['Int']['input'];
};


export type QueryContact_GetContactByContactNetworkArgs = {
  businessId: Scalars['Int']['input'];
  values?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryContact_GetListByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryConversationMember_GetListByConversationIdArgs = {
  conversationId: Scalars['Int']['input'];
};


export type QueryConversationMessage_GetByConversationIdArgs = {
  conversationId: Scalars['Int']['input'];
};


export type QueryConversation_GetByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryConversation_GetConversationByContactIdArgs = {
  contactId: Scalars['Int']['input'];
};


export type QueryConversation_GetConversationByIdArgs = {
  conversationId: Scalars['Int']['input'];
};


export type QueryDeal_GetListByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryDeal_GetListByContactIdArgs = {
  contactId: Scalars['Int']['input'];
};


export type QueryHubSpot_GetAuthLinkArgs = {
  redirectLink?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNote_GetListByContactIdArgs = {
  contactId: Scalars['Int']['input'];
};


export type QueryNotification_GetByIdArgs = {
  entityId: Scalars['Int']['input'];
};


export type QueryPayment_CalculateSubscriptionArgs = {
  input?: InputMaybe<CalculateSubscriptionCostInput>;
};


export type QueryPayment_OperatorModificationCostArgs = {
  operatorCount: Scalars['Int']['input'];
};


export type QueryReport_GetAverageTimeOnHoldReportArgs = {
  input?: InputMaybe<MutualReportInput>;
};


export type QueryReport_GetBestConversionChannelArgs = {
  input?: InputMaybe<MutualReportInput>;
};


export type QueryReport_GetConversationAvgResponseTimeReportArgs = {
  input?: InputMaybe<MutualReportInput>;
};


export type QueryReport_GetCustomerStatusReportArgs = {
  input?: InputMaybe<MutualReportInput>;
};


export type QueryReport_GetPaymentReportArgs = {
  input?: InputMaybe<ReportTimeFrameInput>;
};


export type QueryReport_GetPendingConversationReportArgs = {
  input?: InputMaybe<MutualReportInput>;
};


export type QueryReport_GetTagCategoryReportArgs = {
  input?: InputMaybe<TagCategoryReportInput>;
};


export type QueryReport_GetTeamPerformanceOnDealReportArgs = {
  input?: InputMaybe<TeamPerformanceOnDealReportInput>;
};


export type QueryReport_GetTicketReportArgs = {
  input?: InputMaybe<TicketReportInput>;
};


export type QueryReport_GetTwilioCallReportArgs = {
  input?: InputMaybe<MutualReportInput>;
};


export type QueryTagCategory_GetListByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryTagCategory_GetListByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryTemplate_GetListByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryTemplate_GetListByCategoryIdArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryTicket_GetListByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryTwilio_GetCallTokenArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryTwilio_GetHistoryCallsByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryTwilio_GetHistoryVideosByBusinessIdArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryUser_GetCalendarAuthLinkArgs = {
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUser_IsUserExistByEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export enum ReportTimeFrame {
  AllTime = 'ALL_TIME',
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type ReportTimeFrameInput = {
  timeFrame: ReportTimeFrame;
};

export type ResponseBase = {
  __typename?: 'ResponseBase';
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAccountStateDto = {
  __typename?: 'ResponseBaseOfAccountStateDto';
  result?: Maybe<AccountStateDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAgency = {
  __typename?: 'ResponseBaseOfAgency';
  result?: Maybe<Agency>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAgencyAdminDetailsDto = {
  __typename?: 'ResponseBaseOfAgencyAdminDetailsDto';
  result?: Maybe<AgencyAdminDetailsDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAgencyMember = {
  __typename?: 'ResponseBaseOfAgencyMember';
  result?: Maybe<AgencyMember>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAgencyMemberAssignment = {
  __typename?: 'ResponseBaseOfAgencyMemberAssignment';
  result?: Maybe<AgencyMemberAssignment>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAgencyTeamDto = {
  __typename?: 'ResponseBaseOfAgencyTeamDto';
  result?: Maybe<AgencyTeamDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfAuthResult = {
  __typename?: 'ResponseBaseOfAuthResult';
  result?: Maybe<AuthResult>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBoolean = {
  __typename?: 'ResponseBaseOfBoolean';
  result: Scalars['Boolean']['output'];
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBusiness = {
  __typename?: 'ResponseBaseOfBusiness';
  result?: Maybe<Business>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfBusinessMember = {
  __typename?: 'ResponseBaseOfBusinessMember';
  result?: Maybe<BusinessMember>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCalculateOperatorModificationDto = {
  __typename?: 'ResponseBaseOfCalculateOperatorModificationDto';
  result?: Maybe<CalculateOperatorModificationDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCalculateSubscriptionCostDto = {
  __typename?: 'ResponseBaseOfCalculateSubscriptionCostDto';
  result?: Maybe<CalculateSubscriptionCostDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCalendarAccessTokenDto = {
  __typename?: 'ResponseBaseOfCalendarAccessTokenDto';
  result?: Maybe<CalendarAccessTokenDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCallTokenDto = {
  __typename?: 'ResponseBaseOfCallTokenDto';
  result?: Maybe<CallTokenDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfCategory = {
  __typename?: 'ResponseBaseOfCategory';
  result?: Maybe<Category>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfContact = {
  __typename?: 'ResponseBaseOfContact';
  result?: Maybe<Contact>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfContactTagCategory = {
  __typename?: 'ResponseBaseOfContactTagCategory';
  result?: Maybe<ContactTagCategory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfConversation = {
  __typename?: 'ResponseBaseOfConversation';
  result?: Maybe<Conversation>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfConversationMember = {
  __typename?: 'ResponseBaseOfConversationMember';
  result?: Maybe<ConversationMember>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfConversationMessage = {
  __typename?: 'ResponseBaseOfConversationMessage';
  result?: Maybe<ConversationMessage>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfDeal = {
  __typename?: 'ResponseBaseOfDeal';
  result?: Maybe<Deal>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfDecimal = {
  __typename?: 'ResponseBaseOfDecimal';
  result: Scalars['Decimal']['output'];
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfAverageTimeOnHoldDto = {
  __typename?: 'ResponseBaseOfListOfAverageTimeOnHoldDto';
  result?: Maybe<Array<Maybe<AverageTimeOnHoldDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfConversationAvgResponseTimeDto = {
  __typename?: 'ResponseBaseOfListOfConversationAvgResponseTimeDto';
  result?: Maybe<Array<Maybe<ConversationAvgResponseTimeDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfCustomerStatusReportDto = {
  __typename?: 'ResponseBaseOfListOfCustomerStatusReportDto';
  result?: Maybe<Array<Maybe<CustomerStatusReportDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfDealReportDto = {
  __typename?: 'ResponseBaseOfListOfDealReportDto';
  result?: Maybe<Array<Maybe<DealReportDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfLeadConversationDto = {
  __typename?: 'ResponseBaseOfListOfLeadConversationDto';
  result?: Maybe<Array<Maybe<LeadConversationDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfPaymentReportDto = {
  __typename?: 'ResponseBaseOfListOfPaymentReportDto';
  result?: Maybe<Array<Maybe<PaymentReportDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfTagCategoryReportDto = {
  __typename?: 'ResponseBaseOfListOfTagCategoryReportDto';
  result?: Maybe<Array<Maybe<TagCategoryReportDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfTeamMemberPerformanceOnDealDto = {
  __typename?: 'ResponseBaseOfListOfTeamMemberPerformanceOnDealDto';
  result?: Maybe<Array<Maybe<TeamMemberPerformanceOnDealDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfTicketReportDto = {
  __typename?: 'ResponseBaseOfListOfTicketReportDto';
  result?: Maybe<Array<Maybe<TicketReportDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfListOfTwilioCallReportDto = {
  __typename?: 'ResponseBaseOfListOfTwilioCallReportDto';
  result?: Maybe<Array<Maybe<TwilioCallReportDto>>>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfNote = {
  __typename?: 'ResponseBaseOfNote';
  result?: Maybe<Note>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPaymentHistory = {
  __typename?: 'ResponseBaseOfPaymentHistory';
  result?: Maybe<PaymentHistory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfPaymentIntentDto = {
  __typename?: 'ResponseBaseOfPaymentIntentDto';
  result?: Maybe<PaymentIntentDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfString = {
  __typename?: 'ResponseBaseOfString';
  result?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTagCategory = {
  __typename?: 'ResponseBaseOfTagCategory';
  result?: Maybe<TagCategory>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTemplate = {
  __typename?: 'ResponseBaseOfTemplate';
  result?: Maybe<Template>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTicket = {
  __typename?: 'ResponseBaseOfTicket';
  result?: Maybe<Ticket>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTwilioHistoryVideo = {
  __typename?: 'ResponseBaseOfTwilioHistoryVideo';
  result?: Maybe<TwilioHistoryVideo>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfTwilioPhoneNumber = {
  __typename?: 'ResponseBaseOfTwilioPhoneNumber';
  result?: Maybe<TwilioPhoneNumber>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUser = {
  __typename?: 'ResponseBaseOfUser';
  result?: Maybe<User>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type ResponseBaseOfUserDto = {
  __typename?: 'ResponseBaseOfUserDto';
  result?: Maybe<UserDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SendGmailInput = {
  attachmentUrls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  body?: InputMaybe<Scalars['String']['input']>;
  contactNetworkId: Scalars['Int']['input'];
  conversationId: Scalars['Int']['input'];
  isReplyTo?: InputMaybe<Scalars['Long']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  summaryReplyMessage?: InputMaybe<Scalars['String']['input']>;
};

export type SendSmsInput = {
  contactNetworkId?: InputMaybe<Scalars['Int']['input']>;
  mediaUrls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  message?: InputMaybe<Scalars['String']['input']>;
  sendAsMMS: Scalars['Boolean']['input'];
  sendAt?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type SingleResponseBaseAsyncOfBusiness = {
  __typename?: 'SingleResponseBaseAsyncOfBusiness';
  result?: Maybe<Business>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseAsyncOfBusinessAdminDetailsDto = {
  __typename?: 'SingleResponseBaseAsyncOfBusinessAdminDetailsDto';
  result?: Maybe<BusinessAdminDetailsDto>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseAsyncOfConversation = {
  __typename?: 'SingleResponseBaseAsyncOfConversation';
  result?: Maybe<Conversation>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseAsyncOfNotification = {
  __typename?: 'SingleResponseBaseAsyncOfNotification';
  result?: Maybe<Notification>;
  status?: Maybe<Scalars['Any']['output']>;
};

export type SingleResponseBaseAsyncOfTwilioPhoneNumber = {
  __typename?: 'SingleResponseBaseAsyncOfTwilioPhoneNumber';
  result?: Maybe<TwilioPhoneNumber>;
  status?: Maybe<Scalars['Any']['output']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StartLiveChatInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationMessage?: Maybe<ConversationMessage>;
  conversationMessageByContact?: Maybe<ConversationMessage>;
  notification?: Maybe<Notification>;
  twilioCallChange?: Maybe<TwilioHistoryCall>;
};


export type SubscriptionConversationMessageArgs = {
  userId: Scalars['Int']['input'];
};


export type SubscriptionConversationMessageByContactArgs = {
  contactId: Scalars['Int']['input'];
};


export type SubscriptionNotificationArgs = {
  userId: Scalars['Int']['input'];
};


export type SubscriptionTwilioCallChangeArgs = {
  userId: Scalars['Int']['input'];
};

export type SupportChatSurveyDtoInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  score: Scalars['Int']['input'];
};

export type SupportMessageInput = {
  conversationAttachments?: InputMaybe<Array<InputMaybe<ConversationAttachmentInput>>>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type TagCategory = {
  __typename?: 'TagCategory';
  category?: Maybe<Category>;
  categoryId: Scalars['Int']['output'];
  contactTagCategories?: Maybe<Array<Maybe<ContactTagCategory>>>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type TagCategoryCollectionSegment = {
  __typename?: 'TagCategoryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TagCategory>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TagCategoryFilterInput = {
  and?: InputMaybe<Array<TagCategoryFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<IntOperationFilterInput>;
  contactTagCategories?: InputMaybe<ListFilterInputTypeOfContactTagCategoryFilterInput>;
  contacts?: InputMaybe<ListFilterInputTypeOfContactFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TagCategoryFilterInput>>;
};

export type TagCategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TagCategoryReportDto = {
  __typename?: 'TagCategoryReportDto';
  count: Scalars['Int']['output'];
  tagCategoryName?: Maybe<Scalars['String']['output']>;
};

export type TagCategoryReportInput = {
  businessId: Scalars['Int']['input'];
  categoryId: Scalars['Int']['input'];
  timeFrame: ReportTimeFrame;
};

export type TagCategorySortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type TeamMemberPerformanceOnDealDto = {
  __typename?: 'TeamMemberPerformanceOnDealDto';
  portionPercent: Scalars['Float']['output'];
  teamMemberFullName?: Maybe<Scalars['String']['output']>;
  teamMemberId: Scalars['Int']['output'];
};

export type TeamPerformanceOnDealReportInput = {
  businessId: Scalars['Int']['input'];
  dealStatus: DealStatus;
  timeFrame: ReportTimeFrame;
};

export type Template = {
  __typename?: 'Template';
  category?: Maybe<Category>;
  categoryId: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type TemplateCollectionSegment = {
  __typename?: 'TemplateCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Template>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TemplateFilterInput = {
  and?: InputMaybe<Array<TemplateFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<IntOperationFilterInput>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TemplateFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type TemplateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TemplateSortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  content?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type Ticket = {
  __typename?: 'Ticket';
  assignUser?: Maybe<User>;
  assignUserId: Scalars['Int']['output'];
  business?: Maybe<Business>;
  businessId: Scalars['Int']['output'];
  calendarEventId?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Contact>;
  contactId?: Maybe<Scalars['Int']['output']>;
  createdDate: Scalars['DateTime']['output'];
  creator?: Maybe<User>;
  creatorId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  estimate: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isAppointment: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  meetingLink?: Maybe<Scalars['String']['output']>;
  metaData?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: TicketStatus;
  summary?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type TicketCollectionSegment = {
  __typename?: 'TicketCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Ticket>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TicketFilterInput = {
  and?: InputMaybe<Array<TicketFilterInput>>;
  assignUser?: InputMaybe<UserFilterInput>;
  assignUserId?: InputMaybe<IntOperationFilterInput>;
  business?: InputMaybe<BusinessFilterInput>;
  businessId?: InputMaybe<IntOperationFilterInput>;
  calendarEventId?: InputMaybe<StringOperationFilterInput>;
  contact?: InputMaybe<ContactFilterInput>;
  contactId?: InputMaybe<IntOperationFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creator?: InputMaybe<UserFilterInput>;
  creatorId?: InputMaybe<IntOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  estimate?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isAppointment?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  meetingLink?: InputMaybe<StringOperationFilterInput>;
  metaData?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TicketFilterInput>>;
  startDate?: InputMaybe<DateTimeOperationFilterInput>;
  status?: InputMaybe<TicketStatusOperationFilterInput>;
  summary?: InputMaybe<StringOperationFilterInput>;
};

export type TicketInput = {
  assignUserId?: InputMaybe<Scalars['Int']['input']>;
  contactId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimate?: InputMaybe<Scalars['Int']['input']>;
  isAppointment?: InputMaybe<Scalars['Boolean']['input']>;
  meetingLink?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<TicketStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
};

export type TicketReportDto = {
  __typename?: 'TicketReportDto';
  ticketCount: Scalars['Int']['output'];
  timeUnit: Scalars['Int']['output'];
};

export type TicketReportInput = {
  businessId: Scalars['Int']['input'];
  status?: InputMaybe<TicketStatus>;
  timeFrame: ReportTimeFrame;
};

export type TicketSortInput = {
  assignUser?: InputMaybe<UserSortInput>;
  assignUserId?: InputMaybe<SortEnumType>;
  business?: InputMaybe<BusinessSortInput>;
  businessId?: InputMaybe<SortEnumType>;
  calendarEventId?: InputMaybe<SortEnumType>;
  contact?: InputMaybe<ContactSortInput>;
  contactId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  creator?: InputMaybe<UserSortInput>;
  creatorId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  estimate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAppointment?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  meetingLink?: InputMaybe<SortEnumType>;
  metaData?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  summary?: InputMaybe<SortEnumType>;
};

export enum TicketStatus {
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED'
}

export type TicketStatusOperationFilterInput = {
  eq?: InputMaybe<TicketStatus>;
  in?: InputMaybe<Array<TicketStatus>>;
  neq?: InputMaybe<TicketStatus>;
  nin?: InputMaybe<Array<TicketStatus>>;
};

export type TwilioCallReportDto = {
  __typename?: 'TwilioCallReportDto';
  teamMemberFullName?: Maybe<Scalars['String']['output']>;
  teamMemberId?: Maybe<Scalars['Int']['output']>;
  totalAvgResponseTime: Scalars['Float']['output'];
  totalCallCount: Scalars['Int']['output'];
  totalIncomingCall: Scalars['Int']['output'];
  totalMissedCall: Scalars['Int']['output'];
  under180sCallAvgResponseTime: Scalars['Float']['output'];
  under180sCallCount: Scalars['Int']['output'];
  under180sIncomingCall: Scalars['Int']['output'];
};

export type TwilioHistoryCall = {
  __typename?: 'TwilioHistoryCall';
  callSid?: Maybe<Scalars['String']['output']>;
  callStatus: CallStatus;
  clientId?: Maybe<Scalars['String']['output']>;
  conversationMessage?: Maybe<ConversationMessage>;
  createdDate: Scalars['DateTime']['output'];
  direction: Direction;
  duration?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  enqueue?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  hasCallBeenAnswered: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isRecordDone: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  recordUrl?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
  wasOperatorAvailable: Scalars['Boolean']['output'];
};

/** A segment of a collection. */
export type TwilioHistoryCallCollectionSegment = {
  __typename?: 'TwilioHistoryCallCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TwilioHistoryCall>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TwilioHistoryCallFilterInput = {
  and?: InputMaybe<Array<TwilioHistoryCallFilterInput>>;
  callSid?: InputMaybe<StringOperationFilterInput>;
  callStatus?: InputMaybe<CallStatusOperationFilterInput>;
  clientId?: InputMaybe<StringOperationFilterInput>;
  conversationMessage?: InputMaybe<ConversationMessageFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  direction?: InputMaybe<DirectionOperationFilterInput>;
  duration?: InputMaybe<IntOperationFilterInput>;
  endTime?: InputMaybe<DateTimeOperationFilterInput>;
  enqueue?: InputMaybe<StringOperationFilterInput>;
  from?: InputMaybe<StringOperationFilterInput>;
  hasCallBeenAnswered?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isRecordDone?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TwilioHistoryCallFilterInput>>;
  recordUrl?: InputMaybe<StringOperationFilterInput>;
  to?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<IntOperationFilterInput>;
  wasOperatorAvailable?: InputMaybe<BooleanOperationFilterInput>;
};

export type TwilioHistoryCallSortInput = {
  callSid?: InputMaybe<SortEnumType>;
  callStatus?: InputMaybe<SortEnumType>;
  clientId?: InputMaybe<SortEnumType>;
  conversationMessage?: InputMaybe<ConversationMessageSortInput>;
  createdDate?: InputMaybe<SortEnumType>;
  direction?: InputMaybe<SortEnumType>;
  duration?: InputMaybe<SortEnumType>;
  endTime?: InputMaybe<SortEnumType>;
  enqueue?: InputMaybe<SortEnumType>;
  from?: InputMaybe<SortEnumType>;
  hasCallBeenAnswered?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isRecordDone?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  recordUrl?: InputMaybe<SortEnumType>;
  to?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
  wasOperatorAvailable?: InputMaybe<SortEnumType>;
};

export type TwilioHistoryVideo = {
  __typename?: 'TwilioHistoryVideo';
  conversationMessage?: Maybe<ConversationMessage>;
  createdDate: Scalars['DateTime']['output'];
  creatorUser?: Maybe<User>;
  creatorUserId: Scalars['Int']['output'];
  duration?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isRecordDone: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  recordUrl?: Maybe<Scalars['String']['output']>;
  roomName?: Maybe<Scalars['String']['output']>;
  videoSid?: Maybe<Scalars['String']['output']>;
  videoStatus: VideoStatus;
};

/** A segment of a collection. */
export type TwilioHistoryVideoCollectionSegment = {
  __typename?: 'TwilioHistoryVideoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TwilioHistoryVideo>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TwilioHistoryVideoFilterInput = {
  and?: InputMaybe<Array<TwilioHistoryVideoFilterInput>>;
  conversationMessage?: InputMaybe<ConversationMessageFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creatorUser?: InputMaybe<UserFilterInput>;
  creatorUserId?: InputMaybe<IntOperationFilterInput>;
  duration?: InputMaybe<StringOperationFilterInput>;
  endTime?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isRecordDone?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TwilioHistoryVideoFilterInput>>;
  recordUrl?: InputMaybe<StringOperationFilterInput>;
  roomName?: InputMaybe<StringOperationFilterInput>;
  videoSid?: InputMaybe<StringOperationFilterInput>;
  videoStatus?: InputMaybe<VideoStatusOperationFilterInput>;
};

export type TwilioHistoryVideoSortInput = {
  conversationMessage?: InputMaybe<ConversationMessageSortInput>;
  createdDate?: InputMaybe<SortEnumType>;
  creatorUser?: InputMaybe<UserSortInput>;
  creatorUserId?: InputMaybe<SortEnumType>;
  duration?: InputMaybe<SortEnumType>;
  endTime?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isRecordDone?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  recordUrl?: InputMaybe<SortEnumType>;
  roomName?: InputMaybe<SortEnumType>;
  videoSid?: InputMaybe<SortEnumType>;
  videoStatus?: InputMaybe<SortEnumType>;
};

export type TwilioPhoneNumber = {
  __typename?: 'TwilioPhoneNumber';
  business?: Maybe<Business>;
  createdDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isSold: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

/** A segment of a collection. */
export type TwilioPhoneNumberCollectionSegment = {
  __typename?: 'TwilioPhoneNumberCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TwilioPhoneNumber>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TwilioPhoneNumberFilterInput = {
  and?: InputMaybe<Array<TwilioPhoneNumberFilterInput>>;
  business?: InputMaybe<BusinessFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isSold?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TwilioPhoneNumberFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
};

export type TwilioPhoneNumberInput = {
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type TwilioPhoneNumberSortInput = {
  business?: InputMaybe<BusinessSortInput>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isSold?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
};

export enum TypeBusinessNetwork {
  Facebook = 'FACEBOOK',
  Gmail = 'GMAIL',
  HubSpot = 'HUB_SPOT',
  Instagram = 'INSTAGRAM',
  WhatsApp = 'WHATS_APP'
}

export type TypeBusinessNetworkOperationFilterInput = {
  eq?: InputMaybe<TypeBusinessNetwork>;
  in?: InputMaybe<Array<TypeBusinessNetwork>>;
  neq?: InputMaybe<TypeBusinessNetwork>;
  nin?: InputMaybe<Array<TypeBusinessNetwork>>;
};

export enum TypeContactNetwork {
  Address = 'ADDRESS',
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  LinkedIn = 'LINKED_IN',
  PhoneNumber = 'PHONE_NUMBER',
  WhatsApp = 'WHATS_APP'
}

export type TypeContactNetworkOperationFilterInput = {
  eq?: InputMaybe<TypeContactNetwork>;
  in?: InputMaybe<Array<TypeContactNetwork>>;
  neq?: InputMaybe<TypeContactNetwork>;
  nin?: InputMaybe<Array<TypeContactNetwork>>;
};

export enum TypeSocialNetwork {
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  InternalChat = 'INTERNAL_CHAT',
  LinkedIn = 'LINKED_IN',
  LiveChat = 'LIVE_CHAT',
  Mms = 'MMS',
  Sms = 'SMS',
  SupportChat = 'SUPPORT_CHAT',
  SupportChatSurvey = 'SUPPORT_CHAT_SURVEY',
  TwilioVideoCall = 'TWILIO_VIDEO_CALL',
  TwilioVoiceCall = 'TWILIO_VOICE_CALL',
  WhatsApp = 'WHATS_APP'
}

export type TypeSocialNetworkOperationFilterInput = {
  eq?: InputMaybe<TypeSocialNetwork>;
  in?: InputMaybe<Array<TypeSocialNetwork>>;
  neq?: InputMaybe<TypeSocialNetwork>;
  nin?: InputMaybe<Array<TypeSocialNetwork>>;
};

export type UnseenMessagesByTypeDto = {
  __typename?: 'UnseenMessagesByTypeDto';
  countUnseenMessages: Scalars['Int']['output'];
  typeSocialNetwork: TypeSocialNetwork;
};

/** A segment of a collection. */
export type UnseenMessagesByTypeDtoCollectionSegment = {
  __typename?: 'UnseenMessagesByTypeDtoCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<UnseenMessagesByTypeDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UnseenMessagesByTypeDtoFilterInput = {
  and?: InputMaybe<Array<UnseenMessagesByTypeDtoFilterInput>>;
  countUnseenMessages?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<UnseenMessagesByTypeDtoFilterInput>>;
  typeSocialNetwork?: InputMaybe<TypeSocialNetworkOperationFilterInput>;
};

export type UnseenMessagesByTypeDtoSortInput = {
  countUnseenMessages?: InputMaybe<SortEnumType>;
  typeSocialNetwork?: InputMaybe<SortEnumType>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  assignTickets?: Maybe<Array<Maybe<Ticket>>>;
  calendarAccessToken?: Maybe<Scalars['String']['output']>;
  calendarAccessTokenExpireDate?: Maybe<Scalars['DateTime']['output']>;
  calendarRefreshToken?: Maybe<Scalars['String']['output']>;
  conversationMembers?: Maybe<Array<Maybe<ConversationMember>>>;
  createdDate: Scalars['DateTime']['output'];
  creatorDeals?: Maybe<Array<Maybe<Deal>>>;
  creatorPaymentHistory?: Maybe<Array<Maybe<PaymentHistory>>>;
  creatorTickets?: Maybe<Array<Maybe<Ticket>>>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isOnline: Scalars['Boolean']['output'];
  lastModifiedDate?: Maybe<Scalars['DateTime']['output']>;
  lineStatus: LineStatus;
  location?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  ownerPaymentHistory?: Maybe<Array<Maybe<PaymentHistory>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  twilioHistoryCalls?: Maybe<Array<Maybe<TwilioHistoryCall>>>;
  twilioHistoryVideos?: Maybe<Array<Maybe<TwilioHistoryVideo>>>;
  userType: UserType;
};

/** A segment of a collection. */
export type UserCollectionSegment = {
  __typename?: 'UserCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  businessAccesses?: Maybe<Array<Maybe<BusinessAccessDto>>>;
  isAgency: Scalars['Boolean']['output'];
  isBusinessOwner: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UserFilterInput = {
  about?: InputMaybe<StringOperationFilterInput>;
  age?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<UserFilterInput>>;
  assignTickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  calendarAccessToken?: InputMaybe<StringOperationFilterInput>;
  calendarAccessTokenExpireDate?: InputMaybe<DateTimeOperationFilterInput>;
  calendarRefreshToken?: InputMaybe<StringOperationFilterInput>;
  conversationMembers?: InputMaybe<ListFilterInputTypeOfConversationMemberFilterInput>;
  createdDate?: InputMaybe<DateTimeOperationFilterInput>;
  creatorDeals?: InputMaybe<ListFilterInputTypeOfDealFilterInput>;
  creatorPaymentHistory?: InputMaybe<ListFilterInputTypeOfPaymentHistoryFilterInput>;
  creatorTickets?: InputMaybe<ListFilterInputTypeOfTicketFilterInput>;
  dateOfBirth?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isOnline?: InputMaybe<BooleanOperationFilterInput>;
  lastModifiedDate?: InputMaybe<DateTimeOperationFilterInput>;
  lineStatus?: InputMaybe<LineStatusOperationFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  notifications?: InputMaybe<ListFilterInputTypeOfNotificationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  ownerPaymentHistory?: InputMaybe<ListFilterInputTypeOfPaymentHistoryFilterInput>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  stripeCustomerId?: InputMaybe<StringOperationFilterInput>;
  stripeSubscriptionId?: InputMaybe<StringOperationFilterInput>;
  twilioHistoryCalls?: InputMaybe<ListFilterInputTypeOfTwilioHistoryCallFilterInput>;
  twilioHistoryVideos?: InputMaybe<ListFilterInputTypeOfTwilioHistoryVideoFilterInput>;
  userType?: InputMaybe<UserTypeOperationFilterInput>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
};

export type UserProfileInput = {
  fullName?: InputMaybe<Scalars['String']['input']>;
  lineStatus?: InputMaybe<LineStatus>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UserSortInput = {
  about?: InputMaybe<SortEnumType>;
  age?: InputMaybe<SortEnumType>;
  calendarAccessToken?: InputMaybe<SortEnumType>;
  calendarAccessTokenExpireDate?: InputMaybe<SortEnumType>;
  calendarRefreshToken?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  dateOfBirth?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isOnline?: InputMaybe<SortEnumType>;
  lastModifiedDate?: InputMaybe<SortEnumType>;
  lineStatus?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  stripeCustomerId?: InputMaybe<SortEnumType>;
  stripeSubscriptionId?: InputMaybe<SortEnumType>;
  userType?: InputMaybe<SortEnumType>;
};

export enum UserType {
  Administrator = 'ADMINISTRATOR',
  AgencyMember = 'AGENCY_MEMBER',
  BusinessMember = 'BUSINESS_MEMBER'
}

export type UserTypeOperationFilterInput = {
  eq?: InputMaybe<UserType>;
  in?: InputMaybe<Array<UserType>>;
  neq?: InputMaybe<UserType>;
  nin?: InputMaybe<Array<UserType>>;
};

export enum VideoStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS'
}

export type VideoStatusOperationFilterInput = {
  eq?: InputMaybe<VideoStatus>;
  in?: InputMaybe<Array<VideoStatus>>;
  neq?: InputMaybe<VideoStatus>;
  nin?: InputMaybe<Array<VideoStatus>>;
};

export type VoiceCallRequestInput = {
  callSid?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type AgencyMember_AddAssignmentToBusinessMutationVariables = Exact<{
  agencyMemberId: Scalars['Int']['input'];
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<AgencyMemberAssignmentInput>;
}>;


export type AgencyMember_AddAssignmentToBusinessMutation = { __typename?: 'Mutation', agencyMember_addAssignmentToBusiness?: { __typename?: 'ResponseBaseOfAgencyMemberAssignment', status?: any | null } | null };

export type AgencyMember_BusinessConnectionRequestMutationVariables = Exact<{
  businessId: Scalars['Int']['input'];
  colorTag: ColorTagType;
}>;


export type AgencyMember_BusinessConnectionRequestMutation = { __typename?: 'Mutation', agencyMember_businessConnectionRequest?: { __typename?: 'ResponseBaseOfAgencyMemberAssignment', status?: any | null } | null };

export type AgencyMember_EditMutationVariables = Exact<{
  input?: InputMaybe<AgencyMemberInput>;
  agencyMemberId: Scalars['Int']['input'];
}>;


export type AgencyMember_EditMutation = { __typename?: 'Mutation', agencyMember_edit?: { __typename?: 'ResponseBaseOfAgencyMember', status?: any | null } | null };

export type AgencyMember_EditAssignmentToBusinessMutationVariables = Exact<{
  agencyMemberAssignmentId: Scalars['Int']['input'];
  input?: InputMaybe<AgencyMemberAssignmentInput>;
}>;


export type AgencyMember_EditAssignmentToBusinessMutation = { __typename?: 'Mutation', agencyMember_editAssignmentToBusiness?: { __typename?: 'ResponseBaseOfAgencyMemberAssignment', status?: any | null } | null };

export type AgencyMember_SignUpMemberMutationVariables = Exact<{
  input?: InputMaybe<AgencyMemberInput>;
}>;


export type AgencyMember_SignUpMemberMutation = { __typename?: 'Mutation', agencyMember_signUpMember?: { __typename?: 'ResponseBaseOfAgencyMember', status?: any | null } | null };

export type AgencyMember_SignUpOwnerMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type AgencyMember_SignUpOwnerMutation = { __typename?: 'Mutation', agencyMember_signUpOwner?: { __typename?: 'ResponseBaseOfAgencyMember', status?: any | null, result?: { __typename?: 'AgencyMember', typeMember: AgencyTypeMember, isActive: boolean, isOnline: boolean, externalId?: string | null, email?: string | null, photoUrl?: string | null, fullName?: string | null, phoneNumber?: string | null, about?: string | null, id: number, createdDate: any, isDeleted: boolean, lineStatus: LineStatus, userType: UserType } | null } | null };

export type Agency_EditMutationVariables = Exact<{
  input?: InputMaybe<AgencyInput>;
  agencyId: Scalars['Int']['input'];
}>;


export type Agency_EditMutation = { __typename?: 'Mutation', agency_edit?: { __typename?: 'ResponseBaseOfAgency', status?: any | null } | null };

export type Agency_EditByAdminMutationVariables = Exact<{
  input?: InputMaybe<AgencyAdminInput>;
  agencyId: Scalars['Int']['input'];
}>;


export type Agency_EditByAdminMutation = { __typename?: 'Mutation', agency_editByAdmin?: { __typename?: 'ResponseBaseOfAgency', status?: any | null } | null };

export type LoginMutationVariables = Exact<{
  input?: InputMaybe<FirebaseLoginInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', firebase_login?: { __typename?: 'ResponseBaseOfAuthResult', status?: any | null, result?: { __typename?: 'AuthResult', idToken?: string | null, refreshToken?: string | null, expiresIn: number, user?: { __typename?: 'FirebaseUser', localId?: string | null, email?: string | null, isEmailVerified: boolean, displayName?: string | null, photoUrl?: string | null } | null } | null } | null };

export type GetRefreshTokenMutationVariables = Exact<{
  refreshToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetRefreshTokenMutation = { __typename?: 'Mutation', firebase_getTokenByRefreshToken?: { __typename?: 'ResponseBaseOfAuthResult', result?: { __typename?: 'AuthResult', idToken?: string | null, refreshToken?: string | null, expiresIn: number, user?: { __typename?: 'FirebaseUser', localId?: string | null, email?: string | null, isEmailVerified: boolean, displayName?: string | null, photoUrl?: string | null } | null } | null } | null };

export type IsUserExistQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type IsUserExistQuery = { __typename?: 'Query', user_isUserExistByEmail?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type BusinessConnectionRequest_AcceptedMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;


export type BusinessConnectionRequest_AcceptedMutation = { __typename?: 'Mutation', businessConnectionRequest_accepted?: { __typename?: 'ResponseBaseOfAgencyMemberAssignment', status?: any | null } | null };

export type BusinessConnectionRequest_CanceledMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;


export type BusinessConnectionRequest_CanceledMutation = { __typename?: 'Mutation', businessConnectionRequest_canceled?: { __typename?: 'ResponseBaseOfAgencyMemberAssignment', status?: any | null } | null };

export type BusinessConnectionRequest_RejectedMutationVariables = Exact<{
  entityId: Scalars['Int']['input'];
}>;


export type BusinessConnectionRequest_RejectedMutation = { __typename?: 'Mutation', businessConnectionRequest_rejected?: { __typename?: 'ResponseBaseOfAgencyMemberAssignment', status?: any | null } | null };

export type BusinessMember_EditMutationVariables = Exact<{
  input?: InputMaybe<BusinessMemberInput>;
  businessMemberId: Scalars['Int']['input'];
}>;


export type BusinessMember_EditMutation = { __typename?: 'Mutation', businessMember_edit?: { __typename?: 'ResponseBaseOfBusinessMember', status?: any | null } | null };

export type BusinessMember_SignUpMemberMutationVariables = Exact<{
  input?: InputMaybe<BusinessMemberInput>;
}>;


export type BusinessMember_SignUpMemberMutation = { __typename?: 'Mutation', businessMember_signUpMember?: { __typename?: 'ResponseBaseOfBusinessMember', status?: any | null } | null };

export type BusinessMember_SignUpOwnerMutationVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type BusinessMember_SignUpOwnerMutation = { __typename?: 'Mutation', businessMember_signUpOwner?: { __typename?: 'ResponseBaseOfBusinessMember', status?: any | null, result?: { __typename?: 'BusinessMember', typeMember: BusinessTypeMember, isActive: boolean, isOnline: boolean, externalId?: string | null, email?: string | null, photoUrl?: string | null, fullName?: string | null, phoneNumber?: string | null, about?: string | null, id: number, createdDate: any, isDeleted: boolean, lineStatus: LineStatus, userType: UserType } | null } | null };

export type Business_EditMutationVariables = Exact<{
  input?: InputMaybe<BusinessInput>;
  businessId: Scalars['Int']['input'];
}>;


export type Business_EditMutation = { __typename?: 'Mutation', business_edit?: { __typename?: 'ResponseBaseOfBusiness', status?: any | null } | null };

export type Business_EditByAdminMutationVariables = Exact<{
  input?: InputMaybe<BusinessAdminInput>;
  businessId: Scalars['Int']['input'];
}>;


export type Business_EditByAdminMutation = { __typename?: 'Mutation', business_editByAdmin?: { __typename?: 'ResponseBaseOfBusiness', status?: any | null } | null };

export type Business_SetGmailAuthCodeMutationVariables = Exact<{
  input?: InputMaybe<GmailAuthPayloadInput>;
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type Business_SetGmailAuthCodeMutation = { __typename?: 'Mutation', business_setGmailAuthCode?: { __typename?: 'ResponseBaseOfBoolean', status?: any | null } | null };

export type Business_SetTwilioPhoneNumberMutationVariables = Exact<{
  businessId: Scalars['Int']['input'];
  twilioPhoneNumberId: Scalars['Int']['input'];
}>;


export type Business_SetTwilioPhoneNumberMutation = { __typename?: 'Mutation', business_setTwilioPhoneNumber?: { __typename?: 'ResponseBaseOfBusiness', status?: any | null, result?: { __typename?: 'Business', name?: string | null, logo?: string | null, isHideAgency: boolean, status: AccountStatus, businessKey?: string | null, twilioPhoneNumberId?: number | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, twilioPhoneNumber?: { __typename?: 'TwilioPhoneNumber', id: number, phoneNumber?: string | null, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null, contacts?: Array<{ __typename?: 'Contact', id: number, firstName?: string | null, photoUrl?: string | null } | null> | null } | null } | null };

export type Category_AddMutationVariables = Exact<{
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<CategoryInput>;
}>;


export type Category_AddMutation = { __typename?: 'Mutation', category_add?: { __typename?: 'ResponseBaseOfCategory', status?: any | null } | null };

export type Category_DeleteMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type Category_DeleteMutation = { __typename?: 'Mutation', category_delete?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Category_EditMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  input?: InputMaybe<CategoryInput>;
}>;


export type Category_EditMutation = { __typename?: 'Mutation', category_edit?: { __typename?: 'ResponseBaseOfCategory', status?: any | null } | null };

export type ContactNetwork_DeleteByIdMutationVariables = Exact<{
  contactNetworkId: Scalars['Int']['input'];
}>;


export type ContactNetwork_DeleteByIdMutation = { __typename?: 'Mutation', contactNetwork_deleteById?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type ContactTagCategory_AddMutationVariables = Exact<{
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<ContactTagCategoryInput>;
}>;


export type ContactTagCategory_AddMutation = { __typename?: 'Mutation', contactTagCategory_add?: { __typename?: 'ResponseBaseOfContactTagCategory', status?: any | null } | null };

export type ContactTagCategory_DeleteMutationVariables = Exact<{
  contactTagCategoryId: Scalars['Int']['input'];
}>;


export type ContactTagCategory_DeleteMutation = { __typename?: 'Mutation', contactTagCategory_delete?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type ContactTagCategory_EditMutationVariables = Exact<{
  contactTagCategoryId: Scalars['Int']['input'];
  input?: InputMaybe<ContactTagCategoryInput>;
}>;


export type ContactTagCategory_EditMutation = { __typename?: 'Mutation', contactTagCategory_edit?: { __typename?: 'ResponseBaseOfContactTagCategory', status?: any | null, result?: { __typename?: 'ContactTagCategory', isPinned: boolean, createdDate: any, id: number, isDeleted: boolean, tagCategory?: { __typename?: 'TagCategory', name?: string | null, id: number, category?: { __typename?: 'Category', name?: string | null, id: number, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null } | null, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null } | null } | null } | null };

export type Contact_AddMutationVariables = Exact<{
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<ContactInput>;
}>;


export type Contact_AddMutation = { __typename?: 'Mutation', contact_add?: { __typename?: 'ResponseBaseOfContact', status?: any | null } | null };

export type Contact_EditMutationVariables = Exact<{
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<ContactInput>;
}>;


export type Contact_EditMutation = { __typename?: 'Mutation', contact_edit?: { __typename?: 'ResponseBaseOfContact', status?: any | null } | null };

export type Contact_FetchOrCreateByContactMutationVariables = Exact<{
  businessKey?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<StartLiveChatInput>;
}>;


export type Contact_FetchOrCreateByContactMutation = { __typename?: 'Mutation', contact_fetchOrCreateByContact?: { __typename?: 'ResponseBaseOfContact', status?: any | null, result?: { __typename?: 'Contact', id: number } | null } | null };

export type Contact_MergeContactMutationVariables = Exact<{
  fromContactId: Scalars['Int']['input'];
  toContactId: Scalars['Int']['input'];
}>;


export type Contact_MergeContactMutation = { __typename?: 'Mutation', contact_mergeContact?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type ConversationMember_AddListMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  users?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type ConversationMember_AddListMutation = { __typename?: 'Mutation', conversationMember_addList?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type ConversationMessage_SendMessageToGmailMutationVariables = Exact<{
  input?: InputMaybe<SendGmailInput>;
}>;


export type ConversationMessage_SendMessageToGmailMutation = { __typename?: 'Mutation', conversationMessage_sendMessageToGmail?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null } | null };

export type ConversationMessage_SetSeenStatusMutationVariables = Exact<{
  ints?: InputMaybe<Array<Scalars['Long']['input']> | Scalars['Long']['input']>;
}>;


export type ConversationMessage_SetSeenStatusMutation = { __typename?: 'Mutation', conversationMessage_setSeenStatus?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Conversation_EditMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<ConversationInput>;
}>;


export type Conversation_EditMutation = { __typename?: 'Mutation', conversation_edit?: { __typename?: 'ResponseBaseOfConversation', status?: any | null } | null };

export type Conversation_FetchOrCreateByContactMutationVariables = Exact<{
  businessKey?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ConversationInput>;
}>;


export type Conversation_FetchOrCreateByContactMutation = { __typename?: 'Mutation', conversation_fetchOrCreateByContact?: { __typename?: 'ResponseBaseOfConversation', status?: any | null, result?: { __typename?: 'Conversation', id: number } | null } | null };

export type Deal_AddMutationVariables = Exact<{
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<DealInput>;
}>;


export type Deal_AddMutation = { __typename?: 'Mutation', deal_add?: { __typename?: 'ResponseBaseOfDeal', status?: any | null } | null };

export type Deal_DeleteMutationVariables = Exact<{
  dealId: Scalars['Int']['input'];
}>;


export type Deal_DeleteMutation = { __typename?: 'Mutation', deal_delete?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Deal_EditMutationVariables = Exact<{
  dealId: Scalars['Int']['input'];
  input?: InputMaybe<DealInput>;
}>;


export type Deal_EditMutation = { __typename?: 'Mutation', deal_edit?: { __typename?: 'ResponseBaseOfDeal', status?: any | null } | null };

export type HubSpot_SetByBusinessIdMutationVariables = Exact<{
  code?: InputMaybe<Scalars['String']['input']>;
  businessId: Scalars['Int']['input'];
  redirectLink?: InputMaybe<Scalars['String']['input']>;
}>;


export type HubSpot_SetByBusinessIdMutation = { __typename?: 'Mutation', hubSpot_setByBusinessId?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type HubSpot_SyncSingleContactWithHubSpotMutationVariables = Exact<{
  contactId: Scalars['Int']['input'];
  businessId: Scalars['Int']['input'];
}>;


export type HubSpot_SyncSingleContactWithHubSpotMutation = { __typename?: 'Mutation', hubSpot_syncSingleContactWithHubSpot?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type InternalChat_AddInternalConversationMutationVariables = Exact<{
  internalConveInput?: InputMaybe<InternalConversationInput>;
}>;


export type InternalChat_AddInternalConversationMutation = { __typename?: 'Mutation', internalChat_addInternalConversation?: { __typename?: 'ResponseBaseOfConversation', status?: any | null } | null };

export type InternalChat_AddInternalMessageMutationVariables = Exact<{
  internalMessageInput?: InputMaybe<InternalMessageInput>;
}>;


export type InternalChat_AddInternalMessageMutation = { __typename?: 'Mutation', internalChat_addInternalMessage?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null } | null };

export type LiveChat_SendMessageByContactMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<ConversationMessageInput>;
}>;


export type LiveChat_SendMessageByContactMutation = { __typename?: 'Mutation', liveChat_sendMessageByContact?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null, result?: { __typename?: 'ConversationMessage', id: any, typeSocialNetwork: TypeSocialNetwork, message?: string | null, isAttachment: boolean, conversationId: number, conversationMemberId?: number | null, isSentByContact: boolean, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, conversation?: { __typename?: 'Conversation', id: number, type: ConversationType, createdDate: any } | null, conversationMember?: { __typename?: 'ConversationMember', id: number, user?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null } | null } | null, conversationAttachments?: Array<{ __typename?: 'ConversationAttachment', id: number, type: AttachmentType, url?: string | null } | null> | null } | null } | null };

export type LiveChat_SendMessageByMemberMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<ConversationMessageInput>;
}>;


export type LiveChat_SendMessageByMemberMutation = { __typename?: 'Mutation', liveChat_sendMessageByMember?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null, result?: { __typename?: 'ConversationMessage', id: any, typeSocialNetwork: TypeSocialNetwork, message?: string | null, isAttachment: boolean, conversationId: number, conversationMemberId?: number | null, isSentByContact: boolean, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, conversation?: { __typename?: 'Conversation', id: number, type: ConversationType, createdDate: any } | null, conversationMember?: { __typename?: 'ConversationMember', id: number, user?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null } | null } | null, conversationAttachments?: Array<{ __typename?: 'ConversationAttachment', id: number, type: AttachmentType, url?: string | null } | null> | null } | null } | null };

export type Note_AddMutationVariables = Exact<{
  contactId: Scalars['Int']['input'];
  input?: InputMaybe<NoteInput>;
}>;


export type Note_AddMutation = { __typename?: 'Mutation', note_add?: { __typename?: 'ResponseBaseOfNote', status?: any | null, result?: { __typename?: 'Note', content?: string | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, contact?: { __typename?: 'Contact', id: number, fullName?: string | null } | null } | null } | null };

export type Note_DeleteMutationVariables = Exact<{
  noteId: Scalars['Int']['input'];
}>;


export type Note_DeleteMutation = { __typename?: 'Mutation', note_delete?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Note_EditMutationVariables = Exact<{
  noteId: Scalars['Int']['input'];
  input?: InputMaybe<NoteInput>;
}>;


export type Note_EditMutation = { __typename?: 'Mutation', note_edit?: { __typename?: 'ResponseBaseOfNote', status?: any | null, result?: { __typename?: 'Note', content?: string | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, contact?: { __typename?: 'Contact', id: number } | null } | null } | null };

export type Notification_SetReadStatusMutationVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type Notification_SetReadStatusMutation = { __typename?: 'Mutation', notification_setReadStatus?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Payment_CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type Payment_CancelSubscriptionMutation = { __typename?: 'Mutation', payment_cancelSubscription?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Payment_CreateCustomPackageMutationVariables = Exact<{
  input?: InputMaybe<CreateCustomPackageInput>;
}>;


export type Payment_CreateCustomPackageMutation = { __typename?: 'Mutation', payment_createCustomPackage?: { __typename?: 'ResponseBaseOfPaymentHistory', status?: any | null } | null };

export type Payment_CreatePaymentIntentForCustomPackageMutationVariables = Exact<{
  packageId: Scalars['Int']['input'];
}>;


export type Payment_CreatePaymentIntentForCustomPackageMutation = { __typename?: 'Mutation', payment_createPaymentIntentForCustomPackage?: { __typename?: 'ResponseBaseOfPaymentIntentDto', status?: any | null, result?: { __typename?: 'PaymentIntentDto', clientSecret?: string | null, publishKey?: string | null } | null } | null };

export type Payment_CreateSubscriptionMutationVariables = Exact<{
  input?: InputMaybe<CreateSubscriptionInput>;
}>;


export type Payment_CreateSubscriptionMutation = { __typename?: 'Mutation', payment_createSubscription?: { __typename?: 'ResponseBaseOfString', result?: string | null, status?: any | null } | null };

export type Payment_ModifyOperatorCountMutationVariables = Exact<{
  quantity: Scalars['Int']['input'];
}>;


export type Payment_ModifyOperatorCountMutation = { __typename?: 'Mutation', payment_modifyOperatorCount?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Payment_RemoveCustomPackageMutationVariables = Exact<{
  packageId: Scalars['Int']['input'];
}>;


export type Payment_RemoveCustomPackageMutation = { __typename?: 'Mutation', payment_removeCustomPackage?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type SupportChat_AddSupportMessageMutationVariables = Exact<{
  supportMessageInput?: InputMaybe<SupportMessageInput>;
}>;


export type SupportChat_AddSupportMessageMutation = { __typename?: 'Mutation', supportChat_addSupportMessage?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null, result?: { __typename?: 'ConversationMessage', id: any } | null } | null };

export type SupportChat_AddSupportMessageByAdminMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  supportMessageInput?: InputMaybe<SupportMessageInput>;
}>;


export type SupportChat_AddSupportMessageByAdminMutation = { __typename?: 'Mutation', supportChat_addSupportMessageByAdmin?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null } | null };

export type SupportChat_AddSupportSurveyMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<SupportChatSurveyDtoInput>;
}>;


export type SupportChat_AddSupportSurveyMutation = { __typename?: 'Mutation', supportChat_addSupportSurvey?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null } | null };

export type TagCategory_AddMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  input?: InputMaybe<TagCategoryInput>;
}>;


export type TagCategory_AddMutation = { __typename?: 'Mutation', tagCategory_add?: { __typename?: 'ResponseBaseOfTagCategory', status?: any | null } | null };

export type TagCategory_DeleteMutationVariables = Exact<{
  tagCategoryId: Scalars['Int']['input'];
}>;


export type TagCategory_DeleteMutation = { __typename?: 'Mutation', tagCategory_delete?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type TagCategory_EditMutationVariables = Exact<{
  tagCategoryId: Scalars['Int']['input'];
  input?: InputMaybe<TagCategoryInput>;
}>;


export type TagCategory_EditMutation = { __typename?: 'Mutation', tagCategory_edit?: { __typename?: 'ResponseBaseOfTagCategory', status?: any | null } | null };

export type Template_AddMutationVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  input?: InputMaybe<TemplateInput>;
}>;


export type Template_AddMutation = { __typename?: 'Mutation', template_add?: { __typename?: 'ResponseBaseOfTemplate', status?: any | null } | null };

export type Template_DeleteMutationVariables = Exact<{
  templateId: Scalars['Int']['input'];
}>;


export type Template_DeleteMutation = { __typename?: 'Mutation', template_delete?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Template_EditMutationVariables = Exact<{
  templateId: Scalars['Int']['input'];
  input?: InputMaybe<TemplateInput>;
}>;


export type Template_EditMutation = { __typename?: 'Mutation', template_edit?: { __typename?: 'ResponseBaseOfTemplate', status?: any | null } | null };

export type Ticket_AddMutationVariables = Exact<{
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<TicketInput>;
}>;


export type Ticket_AddMutation = { __typename?: 'Mutation', ticket_add?: { __typename?: 'ResponseBaseOfTicket', status?: any | null } | null };

export type Ticket_DeleteMutationVariables = Exact<{
  ticketId: Scalars['Int']['input'];
}>;


export type Ticket_DeleteMutation = { __typename?: 'Mutation', ticket_delete?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Ticket_EditMutationVariables = Exact<{
  ticketId: Scalars['Int']['input'];
  input?: InputMaybe<TicketInput>;
}>;


export type Ticket_EditMutation = { __typename?: 'Mutation', ticket_edit?: { __typename?: 'ResponseBaseOfTicket', status?: any | null } | null };

export type Twilio_AddPhoneNumberMutationVariables = Exact<{
  input?: InputMaybe<TwilioPhoneNumberInput>;
}>;


export type Twilio_AddPhoneNumberMutation = { __typename?: 'Mutation', twilio_addPhoneNumber?: { __typename?: 'ResponseBaseOfTwilioPhoneNumber', status?: any | null } | null };

export type Twilio_AnswerCallByCallSidMutationVariables = Exact<{
  callSid?: InputMaybe<Scalars['String']['input']>;
}>;


export type Twilio_AnswerCallByCallSidMutation = { __typename?: 'Mutation', twilio_answerCallByCallSid?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Twilio_DeletePhoneNumberMutationVariables = Exact<{
  twilioPhoneNumberId: Scalars['Int']['input'];
}>;


export type Twilio_DeletePhoneNumberMutation = { __typename?: 'Mutation', twilio_deletePhoneNumber?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Twilio_EditPhoneNumberMutationVariables = Exact<{
  twilioPhoneNumberId: Scalars['Int']['input'];
  input?: InputMaybe<TwilioPhoneNumberInput>;
}>;


export type Twilio_EditPhoneNumberMutation = { __typename?: 'Mutation', twilio_editPhoneNumber?: { __typename?: 'ResponseBaseOfTwilioPhoneNumber', status?: any | null } | null };

export type Twilio_GenerateVideoRoomMutationVariables = Exact<{ [key: string]: never; }>;


export type Twilio_GenerateVideoRoomMutation = { __typename?: 'Mutation', twilio_generateVideoRoom?: { __typename?: 'ResponseBaseOfTwilioHistoryVideo', status?: any | null, result?: { __typename?: 'TwilioHistoryVideo', id: number, roomName?: string | null, videoSid?: string | null } | null } | null };

export type Twilio_GetVideoRoomTokenMutationVariables = Exact<{
  identity?: InputMaybe<Scalars['String']['input']>;
  roomName?: InputMaybe<Scalars['String']['input']>;
}>;


export type Twilio_GetVideoRoomTokenMutation = { __typename?: 'Mutation', twilio_getVideoRoomToken?: { __typename?: 'ResponseBaseOfString', result?: string | null, status?: any | null } | null };

export type Twilio_HoldCallByCallSidMutationVariables = Exact<{
  callSid?: InputMaybe<Scalars['String']['input']>;
}>;


export type Twilio_HoldCallByCallSidMutation = { __typename?: 'Mutation', twilio_holdCallByCallSid?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Twilio_RejectCallByCallSidMutationVariables = Exact<{
  callSid?: InputMaybe<Scalars['String']['input']>;
}>;


export type Twilio_RejectCallByCallSidMutation = { __typename?: 'Mutation', twilio_rejectCallByCallSid?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Twilio_SendSmsMutationVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  input?: InputMaybe<SendSmsInput>;
}>;


export type Twilio_SendSmsMutation = { __typename?: 'Mutation', twilio_sendSms?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Twilio_UnHoldCallByCallSidMutationVariables = Exact<{
  callSid?: InputMaybe<Scalars['String']['input']>;
}>;


export type Twilio_UnHoldCallByCallSidMutation = { __typename?: 'Mutation', twilio_unHoldCallByCallSid?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type Twilio_VoiceCallRequestMutationVariables = Exact<{
  businessId: Scalars['Int']['input'];
  input?: InputMaybe<VoiceCallRequestInput>;
}>;


export type Twilio_VoiceCallRequestMutation = { __typename?: 'Mutation', twilio_voiceCallRequest?: { __typename?: 'ResponseBaseOfConversationMessage', status?: any | null } | null };

export type User_ChangePasswordMutationVariables = Exact<{
  currentPassword?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
}>;


export type User_ChangePasswordMutation = { __typename?: 'Mutation', user_changePassword?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type User_EditProfileMutationVariables = Exact<{
  input?: InputMaybe<UserProfileInput>;
}>;


export type User_EditProfileMutation = { __typename?: 'Mutation', user_editProfile?: { __typename?: 'ResponseBaseOfUser', status?: any | null } | null };

export type User_ExchangeCalendarAuthCodeForTokensMutationVariables = Exact<{
  code?: InputMaybe<Scalars['String']['input']>;
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type User_ExchangeCalendarAuthCodeForTokensMutation = { __typename?: 'Mutation', user_exchangeCalendarAuthCodeForTokens?: { __typename?: 'ResponseBaseOfCalendarAccessTokenDto', status?: any | null, result?: { __typename?: 'CalendarAccessTokenDto', accessToken?: string | null, expiresIn: number, baseTokenExpiration: any, tokenType?: string | null, scopes?: string | null, refreshToken?: string | null, expirationTime: any } | null } | null };

export type Twilio_GetListPhoneNumberQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TwilioPhoneNumberFilterInput>;
  order?: InputMaybe<Array<TwilioPhoneNumberSortInput> | TwilioPhoneNumberSortInput>;
}>;


export type Twilio_GetListPhoneNumberQuery = { __typename?: 'Query', Twilio_getListPhoneNumber?: { __typename?: 'ListResponseBaseAsyncOfTwilioPhoneNumber', status?: any | null, result?: { __typename?: 'TwilioPhoneNumberCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'TwilioPhoneNumber', createdDate: any, id: number, isDeleted: boolean, isSold: boolean, lastModifiedDate?: any | null, phoneNumber?: string | null, business?: { __typename?: 'Business', name?: string | null, id: number, logo?: string | null } | null } | null> | null } | null } | null };

export type AgencyMember_GetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AgencyMemberFilterInput>;
  order?: InputMaybe<Array<AgencyMemberSortInput> | AgencyMemberSortInput>;
}>;


export type AgencyMember_GetListQuery = { __typename?: 'Query', agencyMember_getList?: { __typename?: 'ListResponseBaseAsyncOfAgencyMember', status?: any | null, result?: { __typename?: 'AgencyMemberCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'AgencyMember', createdDate: any, lastModifiedDate?: any | null, email?: string | null, fullName?: string | null, id: number, isActive: boolean, isDeleted: boolean, isOnline: boolean, lineStatus: LineStatus, phoneNumber?: string | null, photoUrl?: string | null, typeMember: AgencyTypeMember, userType: UserType, isManageAgencyUserAccess: boolean, isSubscriptionAccess: boolean, agency?: { __typename?: 'Agency', logo?: string | null, id: number, name?: string | null } | null } | null> | null } | null } | null };

export type AgencyMember_GetListAssignmentQueryVariables = Exact<{
  businessId?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AgencyMemberAssignmentFilterInput>;
  order?: InputMaybe<Array<AgencyMemberAssignmentSortInput> | AgencyMemberAssignmentSortInput>;
}>;


export type AgencyMember_GetListAssignmentQuery = { __typename?: 'Query', agencyMember_getListAssignment?: { __typename?: 'ListResponseBaseAsyncOfAgencyMemberAssignment', status?: any | null, result?: { __typename?: 'AgencyMemberAssignmentCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'AgencyMemberAssignment', id: number, createdDate: any, isDeleted: boolean, isOpratorAccess: boolean, isReportAccess: boolean, isSettingsManagmentAccess: boolean, lastModifiedDate?: any | null, business?: { __typename?: 'Business', logo?: string | null, id: number, name?: string | null } | null } | null> | null } | null } | null };

export type Agency_GetAccountStateQueryVariables = Exact<{ [key: string]: never; }>;


export type Agency_GetAccountStateQuery = { __typename?: 'Query', agency_getAccountState?: { __typename?: 'ResponseBaseOfAccountStateDto', status?: any | null, result?: { __typename?: 'AccountStateDto', maxOperatorCount: number, activeOperatorCount: number, accountExpireDate: any } | null } | null };

export type Agency_GetDetailsByAdminQueryVariables = Exact<{
  agencyId: Scalars['Int']['input'];
}>;


export type Agency_GetDetailsByAdminQuery = { __typename?: 'Query', agency_getDetailsByAdmin?: { __typename?: 'ResponseBaseOfAgencyAdminDetailsDto', status?: any | null, result?: { __typename?: 'AgencyAdminDetailsDto', connectedBusinessCount: number, agency?: { __typename?: 'Agency', createdDate: any, id: number, name?: string | null, logo?: string | null, status: AccountStatus, agencyMembers?: Array<{ __typename?: 'AgencyMember', fullName?: string | null, id: number, email?: string | null, photoUrl?: string | null, typeMember: AgencyTypeMember, isActive: boolean, createdDate: any, phoneNumber?: string | null } | null> | null } | null, agencyOwner?: { __typename?: 'AgencyMember', email?: string | null, id: number, phoneNumber?: string | null, photoUrl?: string | null } | null } | null } | null };

export type Agency_GetListByAdminQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AgencyAdminDtoFilterInput>;
  order?: InputMaybe<Array<AgencyAdminDtoSortInput> | AgencyAdminDtoSortInput>;
}>;


export type Agency_GetListByAdminQuery = { __typename?: 'Query', agency_getListByAdmin?: { __typename?: 'ListResponseBaseAsyncOfAgencyAdminDto', status?: any | null, result?: { __typename?: 'AgencyAdminDtoCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'AgencyAdminDto', agency?: { __typename?: 'Agency', logo?: string | null, name?: string | null, id: number, createdDate: any, status: AccountStatus, isDeleted: boolean } | null, agencyOwner?: { __typename?: 'AgencyMember', email?: string | null } | null } | null> | null } | null } | null };

export type Agency_GetMemberTeamQueryVariables = Exact<{
  permissionType?: InputMaybe<PermissionType>;
}>;


export type Agency_GetMemberTeamQuery = { __typename?: 'Query', agency_getMemberTeam?: { __typename?: 'ResponseBaseOfAgencyTeamDto', status?: any | null, result?: { __typename?: 'AgencyTeamDto', agencyMembers?: Array<{ __typename?: 'AgencyMember', id: number, fullName?: string | null, photoUrl?: string | null } | null> | null, businessAccesses?: Array<{ __typename?: 'BusinessAssignmentDto', businessTeams?: Array<{ __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null } | null> | null } | null> | null } | null } | null };

export type BusinessMember_GetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessMemberFilterInput>;
  order?: InputMaybe<Array<BusinessMemberSortInput> | BusinessMemberSortInput>;
}>;


export type BusinessMember_GetListQuery = { __typename?: 'Query', businessMember_getList?: { __typename?: 'ListResponseBaseAsyncOfBusinessMember', status?: any | null, result?: { __typename?: 'BusinessMemberCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'BusinessMember', createdDate: any, lastModifiedDate?: any | null, email?: string | null, fullName?: string | null, id: number, isActive: boolean, isDeleted: boolean, isOnline: boolean, lineStatus: LineStatus, phoneNumber?: string | null, photoUrl?: string | null, typeMember: BusinessTypeMember, userType: UserType, isManageBusinessUserAccess: boolean, isOpratorAccess: boolean, isReportAccess: boolean, isSettingsManagmentAccess: boolean, isSocialManagmentAccess: boolean, isSubscriptionAccess: boolean, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null> | null } | null } | null };

export type Business_GetAccountStateQueryVariables = Exact<{ [key: string]: never; }>;


export type Business_GetAccountStateQuery = { __typename?: 'Query', business_getAccountState?: { __typename?: 'ResponseBaseOfAccountStateDto', status?: any | null, result?: { __typename?: 'AccountStateDto', maxOperatorCount: number, activeOperatorCount: number, accountExpireDate: any } | null } | null };

export type Business_GetByBusinessIdQueryVariables = Exact<{
  businessId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Business_GetByBusinessIdQuery = { __typename?: 'Query', business_getByBusinessId?: { __typename?: 'SingleResponseBaseAsyncOfBusiness', status?: any | null, result?: { __typename?: 'Business', name?: string | null, logo?: string | null, isHideAgency: boolean, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, businessKey?: string | null, twilioPhoneNumber?: { __typename?: 'TwilioPhoneNumber', id: number, phoneNumber?: string | null } | null } | null } | null };

export type Business_GetDetailsByAdminQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
}>;


export type Business_GetDetailsByAdminQuery = { __typename?: 'Query', business_getDetailsByAdmin?: { __typename?: 'SingleResponseBaseAsyncOfBusinessAdminDetailsDto', status?: any | null, result?: { __typename?: 'BusinessAdminDetailsDto', contactsCount: number, business?: { __typename?: 'Business', createdDate: any, status: AccountStatus, name?: string | null, logo?: string | null, id: number, businessMembers?: Array<{ __typename?: 'BusinessMember', fullName?: string | null, photoUrl?: string | null, id: number, isActive: boolean, email?: string | null, typeMember: BusinessTypeMember, createdDate: any } | null> | null } | null, businessOwner?: { __typename?: 'BusinessMember', fullName?: string | null, photoUrl?: string | null, id: number, phoneNumber?: string | null, createdDate: any } | null } | null } | null };

export type Business_GetGmailAuthLinkQueryVariables = Exact<{
  callbackUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type Business_GetGmailAuthLinkQuery = { __typename?: 'Query', business_getGmailAuthLink?: { __typename?: 'ResponseBaseOfString', result?: string | null, status?: any | null } | null };

export type Business_GetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessFilterInput>;
  order?: InputMaybe<Array<BusinessSortInput> | BusinessSortInput>;
}>;


export type Business_GetListQuery = { __typename?: 'Query', business_getList?: { __typename?: 'ListResponseBaseAsyncOfBusiness', status?: any | null, result?: { __typename?: 'BusinessCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Business', createdDate: any, id: number, name?: string | null, logo?: string | null, isHideAgency: boolean, businessMembers?: Array<{ __typename?: 'BusinessMember', email?: string | null } | null> | null } | null> | null } | null } | null };

export type Business_GetListAgencyRequestsQueryVariables = Exact<{
  businessId?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AgencyMemberAssignmentFilterInput>;
  order?: InputMaybe<Array<AgencyMemberAssignmentSortInput> | AgencyMemberAssignmentSortInput>;
}>;


export type Business_GetListAgencyRequestsQuery = { __typename?: 'Query', business_getListAgencyRequests?: { __typename?: 'ListResponseBaseAsyncOfAgencyMemberAssignment', status?: any | null, result?: { __typename?: 'AgencyMemberAssignmentCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'AgencyMemberAssignment', id: number, colorTag?: ColorTagType | null, createdDate: any, lastModifiedDate?: any | null, isDeleted: boolean, status: AgencyMemberAssignmentStatus, businessMember?: { __typename?: 'BusinessMember', id: number, fullName?: string | null, email?: string | null, photoUrl?: string | null, phoneNumber?: string | null } | null, agencyMember?: { __typename?: 'AgencyMember', id: number, fullName?: string | null, email?: string | null, phoneNumber?: string | null, photoUrl?: string | null } | null, business?: { __typename?: 'Business', name?: string | null, id: number, logo?: string | null, status: AccountStatus } | null } | null> | null } | null } | null };

export type Business_GetListByAdminQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BusinessAdminDtoFilterInput>;
  order?: InputMaybe<Array<BusinessAdminDtoSortInput> | BusinessAdminDtoSortInput>;
}>;


export type Business_GetListByAdminQuery = { __typename?: 'Query', business_getListByAdmin?: { __typename?: 'ListResponseBaseAsyncOfBusinessAdminDto', status?: any | null, result?: { __typename?: 'BusinessAdminDtoCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'BusinessAdminDto', business?: { __typename?: 'Business', logo?: string | null, name?: string | null, id: number, createdDate: any, status: AccountStatus, isDeleted: boolean } | null, businessOwner?: { __typename?: 'BusinessMember', email?: string | null } | null } | null> | null } | null } | null };

export type Business_GetTeamByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  permissionType?: InputMaybe<PermissionType>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilterInput>;
  order?: InputMaybe<Array<UserSortInput> | UserSortInput>;
}>;


export type Business_GetTeamByBusinessIdQuery = { __typename?: 'Query', business_getTeamByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfUser', status?: any | null, result?: { __typename?: 'UserCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'User', createdDate: any, userType: UserType, photoUrl?: string | null, id: number, fullName?: string | null, lineStatus: LineStatus, isActive: boolean, isOnline: boolean, isDeleted: boolean, lastModifiedDate?: any | null, email?: string | null } | null> | null } | null } | null };

export type Category_GetListQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryFilterInput>;
  order?: InputMaybe<Array<CategorySortInput> | CategorySortInput>;
}>;


export type Category_GetListQuery = { __typename?: 'Query', category_getList?: { __typename?: 'ListResponseBaseAsyncOfCategory', status?: any | null, result?: { __typename?: 'CategoryCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Category', createdDate: any, id: number, isDeleted: boolean, lastModifiedDate?: any | null, name?: string | null, business?: { __typename?: 'Business', name?: string | null, id: number, logo?: string | null } | null } | null> | null } | null } | null };

export type ContactNetwork_GetListByContactIdQueryVariables = Exact<{
  contactId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactNetworkFilterInput>;
  order?: InputMaybe<Array<ContactNetworkSortInput> | ContactNetworkSortInput>;
}>;


export type ContactNetwork_GetListByContactIdQuery = { __typename?: 'Query', contactNetwork_getListByContactId?: { __typename?: 'ListResponseBaseAsyncOfContactNetwork', status?: any | null, result?: { __typename?: 'ContactNetworkCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'ContactNetwork', typeContactNetwork: TypeContactNetwork, value?: string | null, url?: string | null, id: number } | null> | null } | null } | null };

export type ContactTagCategory_GetListByContactIdQueryVariables = Exact<{
  contactId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactTagCategoryFilterInput>;
  order?: InputMaybe<Array<ContactTagCategorySortInput> | ContactTagCategorySortInput>;
}>;


export type ContactTagCategory_GetListByContactIdQuery = { __typename?: 'Query', contactTagCategory_getListByContactId?: { __typename?: 'ListResponseBaseAsyncOfContactTagCategory', status?: any | null, result?: { __typename?: 'ContactTagCategoryCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'ContactTagCategory', createdDate: any, id: number, isDeleted: boolean, isPinned: boolean, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null } | null, tagCategory?: { __typename?: 'TagCategory', id: number, name?: string | null, category?: { __typename?: 'Category', id: number, name?: string | null, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null } | null } | null> | null } | null } | null };

export type Contact_GetByContactIdQueryVariables = Exact<{
  contactId: Scalars['Int']['input'];
}>;


export type Contact_GetByContactIdQuery = { __typename?: 'Query', contact_getByContactId?: { __typename?: 'ResponseBaseOfContact', status?: any | null, result?: { __typename?: 'Contact', company?: string | null, createdDate: any, dealStatus?: DealStatus | null, firstName?: string | null, lastName?: string | null, fullName?: string | null, id: number, isDeleted: boolean, hubSpotContactId?: string | null, jobTitle?: string | null, lastModifiedDate?: any | null, photoUrl?: string | null, business?: { __typename?: 'Business', name?: string | null, id: number, logo?: string | null } | null } | null } | null };

export type Contact_GetListByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactFilterInput>;
  order?: InputMaybe<Array<ContactSortInput> | ContactSortInput>;
}>;


export type Contact_GetListByBusinessIdQuery = { __typename?: 'Query', contact_getListByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfContact', status?: any | null, result?: { __typename?: 'ContactCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Contact', conversationId: number, company?: string | null, createdDate: any, fullName?: string | null, firstName?: string | null, lastName?: string | null, id: number, hubSpotContactId?: string | null, jobTitle?: string | null, lastModifiedDate?: any | null, photoUrl?: string | null, conversation?: { __typename?: 'Conversation', conversationMembers?: Array<{ __typename?: 'ConversationMember', userId: number } | null> | null } | null, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null, contactNetworks?: Array<{ __typename?: 'ContactNetwork', id: number, url?: string | null, value?: string | null, typeContactNetwork: TypeContactNetwork } | null> | null } | null> | null } | null } | null };

export type ConversationMessage_GetByConversationIdQueryVariables = Exact<{
  conversationId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationMessageFilterInput>;
  order?: InputMaybe<Array<ConversationMessageSortInput> | ConversationMessageSortInput>;
}>;


export type ConversationMessage_GetByConversationIdQuery = { __typename?: 'Query', conversationMessage_getByConversationId?: { __typename?: 'ListResponseBaseAsyncOfConversationMessage', status?: any | null, result?: { __typename?: 'ConversationMessageCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'ConversationMessage', id: any, metaData?: string | null, createdDate: any, isAttachment: boolean, conversationMemberId?: number | null, isSentByContact: boolean, message?: string | null, isReplyTo?: any | null, subject?: string | null, summaryReplyMessage?: string | null, typeSocialNetwork: TypeSocialNetwork, conversationMember?: { __typename?: 'ConversationMember', userId: number, user?: { __typename?: 'User', id: number, fullName?: string | null, email?: string | null, photoUrl?: string | null } | null } | null, conversationAttachments?: Array<{ __typename?: 'ConversationAttachment', createdDate: any, id: number, type: AttachmentType, url?: string | null } | null> | null, conversation?: { __typename?: 'Conversation', title?: string | null, id: number, createdDate: any, type: ConversationType, contact?: { __typename?: 'Contact', id: number, firstName?: string | null, photoUrl?: string | null, fullName?: string | null } | null, conversationMembers?: Array<{ __typename?: 'ConversationMember', userId: number, user?: { __typename?: 'User', id: number, fullName?: string | null, phoneNumber?: string | null, photoUrl?: string | null, email?: string | null } | null } | null> | null } | null } | null> | null } | null } | null };

export type Conversation_GetByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationFilterInput>;
  order?: InputMaybe<Array<ConversationSortInput> | ConversationSortInput>;
}>;


export type Conversation_GetByBusinessIdQuery = { __typename?: 'Query', conversation_getByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfConversation', status?: any | null, result?: { __typename?: 'ConversationCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Conversation', createdDate: any, lastModifiedDate?: any | null, id: number, type: ConversationType, contact?: { __typename?: 'Contact', fullName?: string | null, photoUrl?: string | null, id: number } | null, business?: { __typename?: 'Business', id: number, name?: string | null, status: AccountStatus } | null } | null> | null } | null } | null };

export type Conversation_GetConversationByContactIdQueryVariables = Exact<{
  contactId: Scalars['Int']['input'];
}>;


export type Conversation_GetConversationByContactIdQuery = { __typename?: 'Query', conversation_getConversationByContactId?: { __typename?: 'SingleResponseBaseAsyncOfConversation', status?: any | null, result?: { __typename?: 'Conversation', type: ConversationType, businessId?: number | null, id: number, createdDate: any, lastModifiedDate?: any | null } | null } | null };

export type Conversation_GetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationFilterInput>;
  order?: InputMaybe<Array<ConversationSortInput> | ConversationSortInput>;
}>;


export type Conversation_GetListQuery = { __typename?: 'Query', conversation_getList?: { __typename?: 'ListResponseBaseAsyncOfConversation', status?: any | null, result?: { __typename?: 'ConversationCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Conversation', id: number, title?: string | null, numberOfUnreadMessages: number, createdDate: any, lastModifiedDate?: any | null, type: ConversationType, lastMessage?: { __typename?: 'ConversationMessage', id: any, conversationMember?: { __typename?: 'ConversationMember', userId: number } | null } | null, conversationMembers?: Array<{ __typename?: 'ConversationMember', userId: number, user?: { __typename?: 'User', id: number, fullName?: string | null, phoneNumber?: string | null, photoUrl?: string | null } | null } | null> | null, conversationMessages?: Array<{ __typename?: 'ConversationMessage', message?: string | null, id: any, isSeen: boolean, conversationMember?: { __typename?: 'ConversationMember', userId: number } | null } | null> | null, contact?: { __typename?: 'Contact', id: number, photoUrl?: string | null, fullName?: string | null } | null, business?: { __typename?: 'Business', id: number, logo?: string | null, name?: string | null, status: AccountStatus } | null } | null> | null } | null } | null };

export type Conversation_GetUnseenMessagesByTypeQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UnseenMessagesByTypeDtoFilterInput>;
  order?: InputMaybe<Array<UnseenMessagesByTypeDtoSortInput> | UnseenMessagesByTypeDtoSortInput>;
}>;


export type Conversation_GetUnseenMessagesByTypeQuery = { __typename?: 'Query', conversation_getUnseenMessagesByType?: { __typename?: 'ListResponseBaseAsyncOfUnseenMessagesByTypeDto', status?: any | null, result?: { __typename?: 'UnseenMessagesByTypeDtoCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'UnseenMessagesByTypeDto', countUnseenMessages: number, typeSocialNetwork: TypeSocialNetwork } | null> | null } | null } | null };

export type Deal_GetListByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DealFilterInput>;
  order?: InputMaybe<Array<DealSortInput> | DealSortInput>;
}>;


export type Deal_GetListByBusinessIdQuery = { __typename?: 'Query', deal_getListByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfDeal', status?: any | null, result?: { __typename?: 'DealCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Deal', contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null, createdDate: any, firstName?: string | null, lastName?: string | null, company?: string | null, jobTitle?: string | null, isDeleted: boolean, lastModifiedDate?: any | null } | null } | null> | null } | null } | null };

export type Deal_GetListByContactIdQueryVariables = Exact<{
  contactId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DealFilterInput>;
  order?: InputMaybe<Array<DealSortInput> | DealSortInput>;
}>;


export type Deal_GetListByContactIdQuery = { __typename?: 'Query', deal_getListByContactId?: { __typename?: 'ListResponseBaseAsyncOfDeal', status?: any | null, result?: { __typename?: 'DealCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Deal', createdDate: any, dealStatus: DealStatus, endDate?: any | null, id: number, isDeleted: boolean, lastModifiedDate?: any | null, price: any, title?: string | null, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null } | null } | null> | null } | null } | null };

export type HubSpot_GetAuthLinkQueryVariables = Exact<{
  redirectLink?: InputMaybe<Scalars['String']['input']>;
}>;


export type HubSpot_GetAuthLinkQuery = { __typename?: 'Query', hubSpot_getAuthLink?: { __typename?: 'ResponseBaseOfString', result?: string | null, status?: any | null } | null };

export type Note_GetListByContactIdQueryVariables = Exact<{
  contactId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NoteFilterInput>;
  order?: InputMaybe<Array<NoteSortInput> | NoteSortInput>;
}>;


export type Note_GetListByContactIdQuery = { __typename?: 'Query', note_getListByContactId?: { __typename?: 'ListResponseBaseAsyncOfNote', status?: any | null, result?: { __typename?: 'NoteCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Note', content?: string | null, createdDate: any, id: number, lastModifiedDate?: any | null, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null } | null } | null> | null } | null } | null };

export type Notification_GetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationFilterInput>;
  order?: InputMaybe<Array<NotificationSortInput> | NotificationSortInput>;
}>;


export type Notification_GetListQuery = { __typename?: 'Query', notification_getList?: { __typename?: 'ListResponseBaseAsyncOfNotification', status?: any | null, result?: { __typename?: 'NotificationCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Notification', id: number, content?: string | null, createdDate: any, isSeen: boolean, lastModifiedDate?: any | null, message?: string | null, type: NotificationType, userId: number, user?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null } | null } | null> | null } | null } | null };

export type PaymentHistory_CheckActiveSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentHistory_CheckActiveSubscriptionQuery = { __typename?: 'Query', paymentHistory_checkActiveSubscription?: { __typename?: 'ResponseBaseOfBoolean', result: boolean, status?: any | null } | null };

export type PaymentHistory_GetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PaymentHistoryFilterInput>;
  order?: InputMaybe<Array<PaymentHistorySortInput> | PaymentHistorySortInput>;
}>;


export type PaymentHistory_GetListQuery = { __typename?: 'Query', paymentHistory_getList?: { __typename?: 'ListResponseBaseAsyncOfPaymentHistory', status?: any | null, result?: { __typename?: 'PaymentHistoryCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'PaymentHistory', id: number, createdDate: any, discount: any, expireDate?: any | null, invoiceId?: string | null, lastModifiedDate?: any | null, operatorCount?: number | null, packageDuration?: PackageDuration | null, paymentStatus: PaymentStatus, paymentType: PaymentType, subscriptionId?: string | null, totalPrice: any, creator?: { __typename?: 'User', id: number, fullName?: string | null, phoneNumber?: string | null, photoUrl?: string | null, email?: string | null, userType: UserType } | null, owner?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null, email?: string | null, userType: UserType } | null } | null> | null } | null } | null };

export type Payment_CalculateSubscriptionQueryVariables = Exact<{
  input?: InputMaybe<CalculateSubscriptionCostInput>;
}>;


export type Payment_CalculateSubscriptionQuery = { __typename?: 'Query', payment_calculateSubscription?: { __typename?: 'ResponseBaseOfCalculateSubscriptionCostDto', status?: any | null, result?: { __typename?: 'CalculateSubscriptionCostDto', price: any, discount: any } | null } | null };

export type Payment_CancelingSubscriptionCostQueryVariables = Exact<{ [key: string]: never; }>;


export type Payment_CancelingSubscriptionCostQuery = { __typename?: 'Query', payment_cancelingSubscriptionCost?: { __typename?: 'ResponseBaseOfDecimal', result: any, status?: any | null } | null };

export type Payment_OperatorModificationCostQueryVariables = Exact<{
  operatorCount: Scalars['Int']['input'];
}>;


export type Payment_OperatorModificationCostQuery = { __typename?: 'Query', payment_operatorModificationCost?: { __typename?: 'ResponseBaseOfCalculateOperatorModificationDto', status?: any | null, result?: { __typename?: 'CalculateOperatorModificationDto', cost: any, period?: string | null } | null } | null };

export type Report_GetAverageTimeOnHoldReportQueryVariables = Exact<{
  input?: InputMaybe<MutualReportInput>;
}>;


export type Report_GetAverageTimeOnHoldReportQuery = { __typename?: 'Query', report_getAverageTimeOnHoldReport?: { __typename?: 'ResponseBaseOfListOfAverageTimeOnHoldDto', status?: any | null, result?: Array<{ __typename?: 'AverageTimeOnHoldDto', typeSocialNetwork: TypeSocialNetwork, avgResponseTime: number } | null> | null } | null };

export type Report_GetBestConversionChannelQueryVariables = Exact<{
  input?: InputMaybe<MutualReportInput>;
}>;


export type Report_GetBestConversionChannelQuery = { __typename?: 'Query', report_getBestConversionChannel?: { __typename?: 'ResponseBaseOfListOfDealReportDto', status?: any | null, result?: Array<{ __typename?: 'DealReportDto', typeSocialNetwork: TypeSocialNetwork, portionPercent: any, totalRevenue: any } | null> | null } | null };

export type Report_GetConversationAvgResponseTimeReportQueryVariables = Exact<{
  input?: InputMaybe<MutualReportInput>;
}>;


export type Report_GetConversationAvgResponseTimeReportQuery = { __typename?: 'Query', report_getConversationAvgResponseTimeReport?: { __typename?: 'ResponseBaseOfListOfConversationAvgResponseTimeDto', status?: any | null, result?: Array<{ __typename?: 'ConversationAvgResponseTimeDto', avgResponseTime: number, operatorFullName?: string | null, operatorId?: number | null } | null> | null } | null };

export type Report_GetCustomerStatusReportQueryVariables = Exact<{
  input?: InputMaybe<MutualReportInput>;
}>;


export type Report_GetCustomerStatusReportQuery = { __typename?: 'Query', report_getCustomerStatusReport?: { __typename?: 'ResponseBaseOfListOfCustomerStatusReportDto', status?: any | null, result?: Array<{ __typename?: 'CustomerStatusReportDto', typeSocialNetwork: TypeSocialNetwork, leadCustomerCount: number, appointmentScheduledCustomerCount: number, closedWonCustomerCount: number } | null> | null } | null };

export type Report_GetPaymentReportQueryVariables = Exact<{
  input?: InputMaybe<ReportTimeFrameInput>;
}>;


export type Report_GetPaymentReportQuery = { __typename?: 'Query', report_getPaymentReport?: { __typename?: 'ResponseBaseOfListOfPaymentReportDto', status?: any | null, result?: Array<{ __typename?: 'PaymentReportDto', timeUnit: number, totalPayment: any } | null> | null } | null };

export type Report_GetPendingConversationReportQueryVariables = Exact<{
  input?: InputMaybe<MutualReportInput>;
}>;


export type Report_GetPendingConversationReportQuery = { __typename?: 'Query', report_getPendingConversationReport?: { __typename?: 'ResponseBaseOfListOfLeadConversationDto', status?: any | null, result?: Array<{ __typename?: 'LeadConversationDto', conversationId: number, isLead: boolean } | null> | null } | null };

export type Report_GetTagCategoryReportQueryVariables = Exact<{
  input?: InputMaybe<TagCategoryReportInput>;
}>;


export type Report_GetTagCategoryReportQuery = { __typename?: 'Query', report_getTagCategoryReport?: { __typename?: 'ResponseBaseOfListOfTagCategoryReportDto', status?: any | null, result?: Array<{ __typename?: 'TagCategoryReportDto', tagCategoryName?: string | null, count: number } | null> | null } | null };

export type Report_GetTeamPerformanceOnDealReportQueryVariables = Exact<{
  input?: InputMaybe<TeamPerformanceOnDealReportInput>;
}>;


export type Report_GetTeamPerformanceOnDealReportQuery = { __typename?: 'Query', report_getTeamPerformanceOnDealReport?: { __typename?: 'ResponseBaseOfListOfTeamMemberPerformanceOnDealDto', status?: any | null, result?: Array<{ __typename?: 'TeamMemberPerformanceOnDealDto', teamMemberId: number, teamMemberFullName?: string | null, portionPercent: number } | null> | null } | null };

export type Report_GetTicketReportQueryVariables = Exact<{
  input?: InputMaybe<TicketReportInput>;
}>;


export type Report_GetTicketReportQuery = { __typename?: 'Query', report_getTicketReport?: { __typename?: 'ResponseBaseOfListOfTicketReportDto', status?: any | null, result?: Array<{ __typename?: 'TicketReportDto', ticketCount: number, timeUnit: number } | null> | null } | null };

export type Report_GetTwilioCallReportQueryVariables = Exact<{
  input?: InputMaybe<MutualReportInput>;
}>;


export type Report_GetTwilioCallReportQuery = { __typename?: 'Query', report_getTwilioCallReport?: { __typename?: 'ResponseBaseOfListOfTwilioCallReportDto', status?: any | null, result?: Array<{ __typename?: 'TwilioCallReportDto', teamMemberId?: number | null, totalAvgResponseTime: number, totalCallCount: number, totalIncomingCall: number, totalMissedCall: number, under180sCallAvgResponseTime: number, under180sCallCount: number, under180sIncomingCall: number, teamMemberFullName?: string | null } | null> | null } | null };

export type SupportChat_GetListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ConversationFilterInput>;
  order?: InputMaybe<Array<ConversationSortInput> | ConversationSortInput>;
}>;


export type SupportChat_GetListQuery = { __typename?: 'Query', supportChat_getList?: { __typename?: 'ListResponseBaseAsyncOfConversation', status?: any | null, result?: { __typename?: 'ConversationCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Conversation', createdDate: any, lastModifiedDate?: any | null, numberOfUnreadMessages: number, title?: string | null, type: ConversationType, id: number, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null } | null, lastMessage?: { __typename?: 'ConversationMessage', id: any, conversationMember?: { __typename?: 'ConversationMember', userId: number } | null } | null, conversationMembers?: Array<{ __typename?: 'ConversationMember', id: number, user?: { __typename?: 'User', fullName?: string | null, photoUrl?: string | null, id: number } | null } | null> | null, conversationMessages?: Array<{ __typename?: 'ConversationMessage', metaData?: string | null, conversationId: number, createdDate: any, id: any, isAttachment: boolean, isSeen: boolean, isDeleted: boolean, isSentByContact: boolean, message?: string | null, typeSocialNetwork: TypeSocialNetwork, conversation?: { __typename?: 'Conversation', id: number } | null, conversationAttachments?: Array<{ __typename?: 'ConversationAttachment', url?: string | null, type: AttachmentType, createdDate: any, id: number } | null> | null, conversationMember?: { __typename?: 'ConversationMember', id: number, user?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null, email?: string | null } | null } | null, contactNetwork?: { __typename?: 'ContactNetwork', url?: string | null, value?: string | null, typeContactNetwork: TypeContactNetwork, contact?: { __typename?: 'Contact', fullName?: string | null, id: number, photoUrl?: string | null } | null } | null } | null> | null, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null> | null } | null } | null };

export type TagCategory_GetListByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TagCategoryFilterInput>;
  order?: InputMaybe<Array<TagCategorySortInput> | TagCategorySortInput>;
}>;


export type TagCategory_GetListByBusinessIdQuery = { __typename?: 'Query', tagCategory_getListByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfTagCategory', status?: any | null, result?: { __typename?: 'TagCategoryCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'TagCategory', createdDate: any, id: number, isDeleted: boolean, lastModifiedDate?: any | null, name?: string | null, category?: { __typename?: 'Category', name?: string | null, id: number } | null } | null> | null } | null } | null };

export type TagCategory_GetListByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TagCategoryFilterInput>;
  order?: InputMaybe<Array<TagCategorySortInput> | TagCategorySortInput>;
}>;


export type TagCategory_GetListByCategoryIdQuery = { __typename?: 'Query', tagCategory_getListByCategoryId?: { __typename?: 'ListResponseBaseAsyncOfTagCategory', status?: any | null, result?: { __typename?: 'TagCategoryCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'TagCategory', createdDate: any, id: number, isDeleted: boolean, lastModifiedDate?: any | null, name?: string | null, category?: { __typename?: 'Category', name?: string | null, id: number } | null } | null> | null } | null } | null };

export type Template_GetListByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TemplateFilterInput>;
  order?: InputMaybe<Array<TemplateSortInput> | TemplateSortInput>;
}>;


export type Template_GetListByBusinessIdQuery = { __typename?: 'Query', template_getListByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfTemplate', status?: any | null, result?: { __typename?: 'TemplateCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Template', content?: string | null, title?: string | null, id: number } | null> | null } | null } | null };

export type Template_GetListByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TemplateFilterInput>;
  order?: InputMaybe<Array<TemplateSortInput> | TemplateSortInput>;
}>;


export type Template_GetListByCategoryIdQuery = { __typename?: 'Query', template_getListByCategoryId?: { __typename?: 'ListResponseBaseAsyncOfTemplate', status?: any | null, result?: { __typename?: 'TemplateCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Template', content?: string | null, createdDate: any, id: number, isDeleted: boolean, lastModifiedDate?: any | null, title?: string | null, category?: { __typename?: 'Category', id: number, name?: string | null } | null } | null> | null } | null } | null };

export type Ticket_GetListByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TicketFilterInput>;
  order?: InputMaybe<Array<TicketSortInput> | TicketSortInput>;
}>;


export type Ticket_GetListByBusinessIdQuery = { __typename?: 'Query', ticket_getListByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfTicket', status?: any | null, result?: { __typename?: 'TicketCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Ticket', meetingLink?: string | null, metaData?: string | null, createdDate: any, lastModifiedDate?: any | null, description?: string | null, endDate: any, estimate: number, id: number, isAppointment: boolean, isDeleted: boolean, startDate: any, status: TicketStatus, summary?: string | null, assignUser?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null, email?: string | null } | null, business?: { __typename?: 'Business', name?: string | null, id: number, logo?: string | null } | null, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null } | null, creator?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null, email?: string | null } | null } | null> | null } | null } | null };

export type Twilio_GetCallTokenQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
}>;


export type Twilio_GetCallTokenQuery = { __typename?: 'Query', twilio_getCallToken?: { __typename?: 'ResponseBaseOfCallTokenDto', status?: any | null, result?: { __typename?: 'CallTokenDto', inboundClientId?: string | null, outboundClientId?: string | null, token?: string | null } | null } | null };

export type Twilio_GetHistoryVideosByBusinessIdQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TwilioHistoryVideoFilterInput>;
  order?: InputMaybe<Array<TwilioHistoryVideoSortInput> | TwilioHistoryVideoSortInput>;
}>;


export type Twilio_GetHistoryVideosByBusinessIdQuery = { __typename?: 'Query', twilio_getHistoryVideosByBusinessId?: { __typename?: 'ListResponseBaseAsyncOfTwilioHistoryVideo', status?: any | null, result?: { __typename?: 'TwilioHistoryVideoCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'TwilioHistoryVideo', createdDate: any, lastModifiedDate?: any | null, duration?: string | null, endTime?: any | null, id: number, isRecordDone: boolean, recordUrl?: string | null, roomName?: string | null, videoSid?: string | null, videoStatus: VideoStatus, creatorUser?: { __typename?: 'User', id: number, fullName?: string | null, phoneNumber?: string | null, photoUrl?: string | null } | null, conversationMessage?: { __typename?: 'ConversationMessage', message?: string | null, typeSocialNetwork: TypeSocialNetwork, conversation?: { __typename?: 'Conversation', business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null, status: AccountStatus } | null, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null } | null } | null, twilioHistoryVideo?: { __typename?: 'TwilioHistoryVideo', id: number, roomName?: string | null, createdDate: any, videoStatus: VideoStatus, duration?: string | null, endTime?: any | null } | null, contactNetwork?: { __typename?: 'ContactNetwork', value?: string | null, url?: string | null, typeContactNetwork: TypeContactNetwork, id: number, createdDate: any, contact?: { __typename?: 'Contact', id: number, fullName?: string | null, photoUrl?: string | null, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null } | null } | null } | null> | null } | null } | null };

export type User_GetAccountStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type User_GetAccountStatusQuery = { __typename?: 'Query', user_getAccountStatus?: { __typename?: 'ResponseBase', status?: any | null } | null };

export type User_GetCalendarAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type User_GetCalendarAccessTokenQuery = { __typename?: 'Query', user_getCalendarAccessToken?: { __typename?: 'ResponseBaseOfString', result?: string | null, status?: any | null } | null };

export type User_GetCalendarAuthLinkQueryVariables = Exact<{
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type User_GetCalendarAuthLinkQuery = { __typename?: 'Query', user_getCalendarAuthLink?: { __typename?: 'ResponseBaseOfString', result?: string | null, status?: any | null } | null };

export type User_GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type User_GetCurrentUserQuery = { __typename?: 'Query', user_getCurrentUser?: { __typename?: 'ResponseBaseOfUserDto', status?: any | null, result?: { __typename?: 'UserDto', isAgency: boolean, isBusinessOwner: boolean, user?: { __typename?: 'User', userType: UserType, id: number, fullName?: string | null, createdDate: any, email?: string | null, externalId?: string | null, isActive: boolean, isOnline: boolean, isDeleted: boolean, lastModifiedDate?: any | null, lineStatus: LineStatus, phoneNumber?: string | null, photoUrl?: string | null } | null, businessAccesses?: Array<{ __typename?: 'BusinessAccessDto', business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null, createdDate: any, lastModifiedDate?: any | null, isDeleted: boolean, isHideAgency: boolean, status: AccountStatus, twilioPhoneNumber?: { __typename?: 'TwilioPhoneNumber', id: number, phoneNumber?: string | null } | null, categories?: Array<{ __typename?: 'Category', id: number, name?: string | null } | null> | null, businessMembers?: Array<{ __typename?: 'BusinessMember', id: number, typeMember: BusinessTypeMember } | null> | null } | null, access?: { __typename?: 'MemberAccessDto', isManageAgencyUserAccess: boolean, isManageBusinessUserAccess: boolean, isOpratorAccess: boolean, isReportAccess: boolean, isSettingsManagmentAccess: boolean, isSocialManagmentAccess: boolean } | null } | null> | null } | null } | null };

export type ConversationMessageSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ConversationMessageSubscription = { __typename?: 'Subscription', conversationMessage?: { __typename?: 'ConversationMessage', id: any, typeSocialNetwork: TypeSocialNetwork, message?: string | null, isAttachment: boolean, conversationId: number, conversationMemberId?: number | null, isSentByContact: boolean, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, twilioHistoryCall?: { __typename?: 'TwilioHistoryCall', callSid?: string | null, callStatus: CallStatus, clientId?: string | null, createdDate: any, direction: Direction, duration?: number | null, endTime?: any | null, enqueue?: string | null, from?: string | null, hasCallBeenAnswered: boolean, id: number, isRecordDone: boolean, lastModifiedDate?: any | null, recordUrl?: string | null, to?: string | null, wasOperatorAvailable: boolean, user?: { __typename?: 'User', id: number, fullName?: string | null, phoneNumber?: string | null, photoUrl?: string | null } | null } | null, contactNetwork?: { __typename?: 'ContactNetwork', id: number, typeContactNetwork: TypeContactNetwork, value?: string | null } | null, conversation?: { __typename?: 'Conversation', numberOfUnreadMessages: number, type: ConversationType, isPinned: boolean, businessId?: number | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, business?: { __typename?: 'Business', id: number, logo?: string | null, name?: string | null } | null, contact?: { __typename?: 'Contact', id: number, photoUrl?: string | null, fullName?: string | null, contactNetworks?: Array<{ __typename?: 'ContactNetwork', value?: string | null } | null> | null } | null } | null, conversationMember?: { __typename?: 'ConversationMember', userId: number, conversationId: number, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, user?: { __typename?: 'User', id: number, fullName?: string | null, photoUrl?: string | null, email?: string | null } | null } | null, conversationAttachments?: Array<{ __typename?: 'ConversationAttachment', type: AttachmentType, url?: string | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null } | null> | null } | null };

export type ConversationMessageByContactSubscriptionVariables = Exact<{
  contactId: Scalars['Int']['input'];
}>;


export type ConversationMessageByContactSubscription = { __typename?: 'Subscription', conversationMessageByContact?: { __typename?: 'ConversationMessage', id: any, typeSocialNetwork: TypeSocialNetwork, message?: string | null, isAttachment: boolean, conversationId: number, conversationMemberId?: number | null, isSentByContact: boolean, createdDate: any, lastModifiedDate?: any | null, conversation?: { __typename?: 'Conversation', type: ConversationType, isPinned: boolean, businessId?: number | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, contact?: { __typename?: 'Contact', fullName?: string | null, photoUrl?: string | null, id: number, contactNetworks?: Array<{ __typename?: 'ContactNetwork', value?: string | null } | null> | null } | null } | null, conversationMember?: { __typename?: 'ConversationMember', conversationId: number, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, user?: { __typename?: 'User', id: number, photoUrl?: string | null, fullName?: string | null, email?: string | null } | null } | null, conversationAttachments?: Array<{ __typename?: 'ConversationAttachment', type: AttachmentType, url?: string | null, conversationMessageId: any, id: number, isDeleted: boolean, createdDate: any } | null> | null } | null };

export type NotificationSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type NotificationSubscription = { __typename?: 'Subscription', notification?: { __typename?: 'Notification', type: NotificationType, content?: string | null, message?: string | null, isSeen: boolean, userId: number, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null } | null };

export type TwilioCallChangeSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type TwilioCallChangeSubscription = { __typename?: 'Subscription', twilioCallChange?: { __typename?: 'TwilioHistoryCall', callSid?: string | null, enqueue?: string | null, clientId?: string | null, callStatus: CallStatus, endTime?: any | null, isRecordDone: boolean, recordUrl?: string | null, duration?: number | null, hasCallBeenAnswered: boolean, wasOperatorAvailable: boolean, direction: Direction, from?: string | null, to?: string | null, userId?: number | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, user?: { __typename?: 'User', userType: UserType, lineStatus: LineStatus, isActive: boolean, isOnline: boolean, externalId?: string | null, email?: string | null, photoUrl?: string | null, fullName?: string | null, phoneNumber?: string | null, about?: string | null, location?: string | null, age?: number | null, dateOfBirth?: any | null, id: number, isDeleted: boolean, createdDate: any, lastModifiedDate?: any | null, twilioHistoryCalls?: Array<{ __typename?: 'TwilioHistoryCall', callSid?: string | null, callStatus: CallStatus, clientId?: string | null, conversationMessage?: { __typename?: 'ConversationMessage', typeSocialNetwork: TypeSocialNetwork, message?: string | null, conversation?: { __typename?: 'Conversation', businessId?: number | null, createdDate: any, numberOfUnreadMessages: number, id: number, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null, contactNetwork?: { __typename?: 'ContactNetwork', createdDate: any, typeContactNetwork: TypeContactNetwork, url?: string | null, value?: string | null, contact?: { __typename?: 'Contact', businessId: number, id: number, fullName?: string | null, photoUrl?: string | null, business?: { __typename?: 'Business', id: number, name?: string | null, logo?: string | null } | null } | null } | null } | null } | null> | null } | null } | null };



export const AgencyMember_AddAssignmentToBusinessDocument = `
    mutation agencyMember_addAssignmentToBusiness($agencyMemberId: Int!, $businessId: Int!, $input: AgencyMemberAssignmentInput) {
  agencyMember_addAssignmentToBusiness(
    agencyMemberId: $agencyMemberId
    businessId: $businessId
    input: $input
  ) {
    status
  }
}
    `;

export const useAgencyMember_AddAssignmentToBusinessMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AgencyMember_AddAssignmentToBusinessMutation, TError, AgencyMember_AddAssignmentToBusinessMutationVariables, TContext>) => {
    
    return useMutation<AgencyMember_AddAssignmentToBusinessMutation, TError, AgencyMember_AddAssignmentToBusinessMutationVariables, TContext>(
      {
    mutationKey: ['agencyMember_addAssignmentToBusiness'],
    mutationFn: (variables?: AgencyMember_AddAssignmentToBusinessMutationVariables) => fetcher<AgencyMember_AddAssignmentToBusinessMutation, AgencyMember_AddAssignmentToBusinessMutationVariables>(AgencyMember_AddAssignmentToBusinessDocument, variables)(),
    ...options
  }
    )};

export const AgencyMember_BusinessConnectionRequestDocument = `
    mutation agencyMember_businessConnectionRequest($businessId: Int!, $colorTag: ColorTagType!) {
  agencyMember_businessConnectionRequest(
    businessId: $businessId
    colorTag: $colorTag
  ) {
    status
  }
}
    `;

export const useAgencyMember_BusinessConnectionRequestMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AgencyMember_BusinessConnectionRequestMutation, TError, AgencyMember_BusinessConnectionRequestMutationVariables, TContext>) => {
    
    return useMutation<AgencyMember_BusinessConnectionRequestMutation, TError, AgencyMember_BusinessConnectionRequestMutationVariables, TContext>(
      {
    mutationKey: ['agencyMember_businessConnectionRequest'],
    mutationFn: (variables?: AgencyMember_BusinessConnectionRequestMutationVariables) => fetcher<AgencyMember_BusinessConnectionRequestMutation, AgencyMember_BusinessConnectionRequestMutationVariables>(AgencyMember_BusinessConnectionRequestDocument, variables)(),
    ...options
  }
    )};

export const AgencyMember_EditDocument = `
    mutation agencyMember_edit($input: AgencyMemberInput, $agencyMemberId: Int!) {
  agencyMember_edit(input: $input, agencyMemberId: $agencyMemberId) {
    status
  }
}
    `;

export const useAgencyMember_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AgencyMember_EditMutation, TError, AgencyMember_EditMutationVariables, TContext>) => {
    
    return useMutation<AgencyMember_EditMutation, TError, AgencyMember_EditMutationVariables, TContext>(
      {
    mutationKey: ['agencyMember_edit'],
    mutationFn: (variables?: AgencyMember_EditMutationVariables) => fetcher<AgencyMember_EditMutation, AgencyMember_EditMutationVariables>(AgencyMember_EditDocument, variables)(),
    ...options
  }
    )};

export const AgencyMember_EditAssignmentToBusinessDocument = `
    mutation agencyMember_editAssignmentToBusiness($agencyMemberAssignmentId: Int!, $input: AgencyMemberAssignmentInput) {
  agencyMember_editAssignmentToBusiness(
    agencyMemberAssignmentId: $agencyMemberAssignmentId
    input: $input
  ) {
    status
  }
}
    `;

export const useAgencyMember_EditAssignmentToBusinessMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AgencyMember_EditAssignmentToBusinessMutation, TError, AgencyMember_EditAssignmentToBusinessMutationVariables, TContext>) => {
    
    return useMutation<AgencyMember_EditAssignmentToBusinessMutation, TError, AgencyMember_EditAssignmentToBusinessMutationVariables, TContext>(
      {
    mutationKey: ['agencyMember_editAssignmentToBusiness'],
    mutationFn: (variables?: AgencyMember_EditAssignmentToBusinessMutationVariables) => fetcher<AgencyMember_EditAssignmentToBusinessMutation, AgencyMember_EditAssignmentToBusinessMutationVariables>(AgencyMember_EditAssignmentToBusinessDocument, variables)(),
    ...options
  }
    )};

export const AgencyMember_SignUpMemberDocument = `
    mutation agencyMember_signUpMember($input: AgencyMemberInput) {
  agencyMember_signUpMember(input: $input) {
    status
  }
}
    `;

export const useAgencyMember_SignUpMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AgencyMember_SignUpMemberMutation, TError, AgencyMember_SignUpMemberMutationVariables, TContext>) => {
    
    return useMutation<AgencyMember_SignUpMemberMutation, TError, AgencyMember_SignUpMemberMutationVariables, TContext>(
      {
    mutationKey: ['agencyMember_signUpMember'],
    mutationFn: (variables?: AgencyMember_SignUpMemberMutationVariables) => fetcher<AgencyMember_SignUpMemberMutation, AgencyMember_SignUpMemberMutationVariables>(AgencyMember_SignUpMemberDocument, variables)(),
    ...options
  }
    )};

export const AgencyMember_SignUpOwnerDocument = `
    mutation agencyMember_signUpOwner($input: UserInput) {
  agencyMember_signUpOwner(input: $input) {
    result {
      typeMember
      isActive
      isOnline
      externalId
      email
      photoUrl
      fullName
      phoneNumber
      about
      id
      createdDate
      isDeleted
      lineStatus
      userType
    }
    status
  }
}
    `;

export const useAgencyMember_SignUpOwnerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AgencyMember_SignUpOwnerMutation, TError, AgencyMember_SignUpOwnerMutationVariables, TContext>) => {
    
    return useMutation<AgencyMember_SignUpOwnerMutation, TError, AgencyMember_SignUpOwnerMutationVariables, TContext>(
      {
    mutationKey: ['agencyMember_signUpOwner'],
    mutationFn: (variables?: AgencyMember_SignUpOwnerMutationVariables) => fetcher<AgencyMember_SignUpOwnerMutation, AgencyMember_SignUpOwnerMutationVariables>(AgencyMember_SignUpOwnerDocument, variables)(),
    ...options
  }
    )};

export const Agency_EditDocument = `
    mutation agency_edit($input: AgencyInput, $agencyId: Int!) {
  agency_edit(input: $input, agencyId: $agencyId) {
    status
  }
}
    `;

export const useAgency_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Agency_EditMutation, TError, Agency_EditMutationVariables, TContext>) => {
    
    return useMutation<Agency_EditMutation, TError, Agency_EditMutationVariables, TContext>(
      {
    mutationKey: ['agency_edit'],
    mutationFn: (variables?: Agency_EditMutationVariables) => fetcher<Agency_EditMutation, Agency_EditMutationVariables>(Agency_EditDocument, variables)(),
    ...options
  }
    )};

export const Agency_EditByAdminDocument = `
    mutation agency_editByAdmin($input: AgencyAdminInput, $agencyId: Int!) {
  agency_editByAdmin(input: $input, agencyId: $agencyId) {
    status
  }
}
    `;

export const useAgency_EditByAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Agency_EditByAdminMutation, TError, Agency_EditByAdminMutationVariables, TContext>) => {
    
    return useMutation<Agency_EditByAdminMutation, TError, Agency_EditByAdminMutationVariables, TContext>(
      {
    mutationKey: ['agency_editByAdmin'],
    mutationFn: (variables?: Agency_EditByAdminMutationVariables) => fetcher<Agency_EditByAdminMutation, Agency_EditByAdminMutationVariables>(Agency_EditByAdminDocument, variables)(),
    ...options
  }
    )};

export const LoginDocument = `
    mutation login($input: FirebaseLoginInput) {
  firebase_login(input: $input) {
    result {
      idToken
      refreshToken
      expiresIn
      user {
        localId
        email
        isEmailVerified
        displayName
        photoUrl
      }
    }
    status
  }
}
    `;

export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) => {
    
    return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      {
    mutationKey: ['login'],
    mutationFn: (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
    ...options
  }
    )};

export const GetRefreshTokenDocument = `
    mutation getRefreshToken($refreshToken: String) {
  firebase_getTokenByRefreshToken(refreshToken: $refreshToken) {
    result {
      idToken
      refreshToken
      expiresIn
      user {
        localId
        email
        isEmailVerified
        displayName
        photoUrl
      }
    }
  }
}
    `;

export const useGetRefreshTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<GetRefreshTokenMutation, TError, GetRefreshTokenMutationVariables, TContext>) => {
    
    return useMutation<GetRefreshTokenMutation, TError, GetRefreshTokenMutationVariables, TContext>(
      {
    mutationKey: ['getRefreshToken'],
    mutationFn: (variables?: GetRefreshTokenMutationVariables) => fetcher<GetRefreshTokenMutation, GetRefreshTokenMutationVariables>(GetRefreshTokenDocument, variables)(),
    ...options
  }
    )};

export const IsUserExistDocument = `
    query isUserExist($email: String) {
  user_isUserExistByEmail(email: $email) {
    status
  }
}
    `;

export const useIsUserExistQuery = <
      TData = IsUserExistQuery,
      TError = unknown
    >(
      variables?: IsUserExistQueryVariables,
      options?: Omit<UseQueryOptions<IsUserExistQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<IsUserExistQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<IsUserExistQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['isUserExist'] : ['isUserExist', variables],
    queryFn: fetcher<IsUserExistQuery, IsUserExistQueryVariables>(IsUserExistDocument, variables),
    ...options
  }
    )};

export const BusinessConnectionRequest_AcceptedDocument = `
    mutation businessConnectionRequest_accepted($entityId: Int!) {
  businessConnectionRequest_accepted(entityId: $entityId) {
    status
  }
}
    `;

export const useBusinessConnectionRequest_AcceptedMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BusinessConnectionRequest_AcceptedMutation, TError, BusinessConnectionRequest_AcceptedMutationVariables, TContext>) => {
    
    return useMutation<BusinessConnectionRequest_AcceptedMutation, TError, BusinessConnectionRequest_AcceptedMutationVariables, TContext>(
      {
    mutationKey: ['businessConnectionRequest_accepted'],
    mutationFn: (variables?: BusinessConnectionRequest_AcceptedMutationVariables) => fetcher<BusinessConnectionRequest_AcceptedMutation, BusinessConnectionRequest_AcceptedMutationVariables>(BusinessConnectionRequest_AcceptedDocument, variables)(),
    ...options
  }
    )};

export const BusinessConnectionRequest_CanceledDocument = `
    mutation businessConnectionRequest_canceled($entityId: Int!) {
  businessConnectionRequest_canceled(entityId: $entityId) {
    status
  }
}
    `;

export const useBusinessConnectionRequest_CanceledMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BusinessConnectionRequest_CanceledMutation, TError, BusinessConnectionRequest_CanceledMutationVariables, TContext>) => {
    
    return useMutation<BusinessConnectionRequest_CanceledMutation, TError, BusinessConnectionRequest_CanceledMutationVariables, TContext>(
      {
    mutationKey: ['businessConnectionRequest_canceled'],
    mutationFn: (variables?: BusinessConnectionRequest_CanceledMutationVariables) => fetcher<BusinessConnectionRequest_CanceledMutation, BusinessConnectionRequest_CanceledMutationVariables>(BusinessConnectionRequest_CanceledDocument, variables)(),
    ...options
  }
    )};

export const BusinessConnectionRequest_RejectedDocument = `
    mutation businessConnectionRequest_rejected($entityId: Int!) {
  businessConnectionRequest_rejected(entityId: $entityId) {
    status
  }
}
    `;

export const useBusinessConnectionRequest_RejectedMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BusinessConnectionRequest_RejectedMutation, TError, BusinessConnectionRequest_RejectedMutationVariables, TContext>) => {
    
    return useMutation<BusinessConnectionRequest_RejectedMutation, TError, BusinessConnectionRequest_RejectedMutationVariables, TContext>(
      {
    mutationKey: ['businessConnectionRequest_rejected'],
    mutationFn: (variables?: BusinessConnectionRequest_RejectedMutationVariables) => fetcher<BusinessConnectionRequest_RejectedMutation, BusinessConnectionRequest_RejectedMutationVariables>(BusinessConnectionRequest_RejectedDocument, variables)(),
    ...options
  }
    )};

export const BusinessMember_EditDocument = `
    mutation businessMember_edit($input: BusinessMemberInput, $businessMemberId: Int!) {
  businessMember_edit(input: $input, businessMemberId: $businessMemberId) {
    status
  }
}
    `;

export const useBusinessMember_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BusinessMember_EditMutation, TError, BusinessMember_EditMutationVariables, TContext>) => {
    
    return useMutation<BusinessMember_EditMutation, TError, BusinessMember_EditMutationVariables, TContext>(
      {
    mutationKey: ['businessMember_edit'],
    mutationFn: (variables?: BusinessMember_EditMutationVariables) => fetcher<BusinessMember_EditMutation, BusinessMember_EditMutationVariables>(BusinessMember_EditDocument, variables)(),
    ...options
  }
    )};

export const BusinessMember_SignUpMemberDocument = `
    mutation businessMember_signUpMember($input: BusinessMemberInput) {
  businessMember_signUpMember(input: $input) {
    status
  }
}
    `;

export const useBusinessMember_SignUpMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BusinessMember_SignUpMemberMutation, TError, BusinessMember_SignUpMemberMutationVariables, TContext>) => {
    
    return useMutation<BusinessMember_SignUpMemberMutation, TError, BusinessMember_SignUpMemberMutationVariables, TContext>(
      {
    mutationKey: ['businessMember_signUpMember'],
    mutationFn: (variables?: BusinessMember_SignUpMemberMutationVariables) => fetcher<BusinessMember_SignUpMemberMutation, BusinessMember_SignUpMemberMutationVariables>(BusinessMember_SignUpMemberDocument, variables)(),
    ...options
  }
    )};

export const BusinessMember_SignUpOwnerDocument = `
    mutation businessMember_signUpOwner($input: UserInput) {
  businessMember_signUpOwner(input: $input) {
    result {
      typeMember
      isActive
      isOnline
      externalId
      email
      photoUrl
      fullName
      phoneNumber
      about
      id
      createdDate
      isDeleted
      lineStatus
      userType
    }
    status
  }
}
    `;

export const useBusinessMember_SignUpOwnerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BusinessMember_SignUpOwnerMutation, TError, BusinessMember_SignUpOwnerMutationVariables, TContext>) => {
    
    return useMutation<BusinessMember_SignUpOwnerMutation, TError, BusinessMember_SignUpOwnerMutationVariables, TContext>(
      {
    mutationKey: ['businessMember_signUpOwner'],
    mutationFn: (variables?: BusinessMember_SignUpOwnerMutationVariables) => fetcher<BusinessMember_SignUpOwnerMutation, BusinessMember_SignUpOwnerMutationVariables>(BusinessMember_SignUpOwnerDocument, variables)(),
    ...options
  }
    )};

export const Business_EditDocument = `
    mutation business_edit($input: BusinessInput, $businessId: Int!) {
  business_edit(input: $input, businessId: $businessId) {
    status
  }
}
    `;

export const useBusiness_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Business_EditMutation, TError, Business_EditMutationVariables, TContext>) => {
    
    return useMutation<Business_EditMutation, TError, Business_EditMutationVariables, TContext>(
      {
    mutationKey: ['business_edit'],
    mutationFn: (variables?: Business_EditMutationVariables) => fetcher<Business_EditMutation, Business_EditMutationVariables>(Business_EditDocument, variables)(),
    ...options
  }
    )};

export const Business_EditByAdminDocument = `
    mutation business_editByAdmin($input: BusinessAdminInput, $businessId: Int!) {
  business_editByAdmin(input: $input, businessId: $businessId) {
    status
  }
}
    `;

export const useBusiness_EditByAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Business_EditByAdminMutation, TError, Business_EditByAdminMutationVariables, TContext>) => {
    
    return useMutation<Business_EditByAdminMutation, TError, Business_EditByAdminMutationVariables, TContext>(
      {
    mutationKey: ['business_editByAdmin'],
    mutationFn: (variables?: Business_EditByAdminMutationVariables) => fetcher<Business_EditByAdminMutation, Business_EditByAdminMutationVariables>(Business_EditByAdminDocument, variables)(),
    ...options
  }
    )};

export const Business_SetGmailAuthCodeDocument = `
    mutation business_setGmailAuthCode($input: GmailAuthPayloadInput, $callbackUrl: String) {
  business_setGmailAuthCode(input: $input, callbackUrl: $callbackUrl) {
    status
  }
}
    `;

export const useBusiness_SetGmailAuthCodeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Business_SetGmailAuthCodeMutation, TError, Business_SetGmailAuthCodeMutationVariables, TContext>) => {
    
    return useMutation<Business_SetGmailAuthCodeMutation, TError, Business_SetGmailAuthCodeMutationVariables, TContext>(
      {
    mutationKey: ['business_setGmailAuthCode'],
    mutationFn: (variables?: Business_SetGmailAuthCodeMutationVariables) => fetcher<Business_SetGmailAuthCodeMutation, Business_SetGmailAuthCodeMutationVariables>(Business_SetGmailAuthCodeDocument, variables)(),
    ...options
  }
    )};

export const Business_SetTwilioPhoneNumberDocument = `
    mutation business_setTwilioPhoneNumber($businessId: Int!, $twilioPhoneNumberId: Int!) {
  business_setTwilioPhoneNumber(
    businessId: $businessId
    twilioPhoneNumberId: $twilioPhoneNumberId
  ) {
    result {
      name
      logo
      isHideAgency
      status
      businessKey
      twilioPhoneNumberId
      twilioPhoneNumber {
        id
        phoneNumber
        business {
          id
          name
          logo
        }
      }
      contacts {
        id
        firstName
        photoUrl
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useBusiness_SetTwilioPhoneNumberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Business_SetTwilioPhoneNumberMutation, TError, Business_SetTwilioPhoneNumberMutationVariables, TContext>) => {
    
    return useMutation<Business_SetTwilioPhoneNumberMutation, TError, Business_SetTwilioPhoneNumberMutationVariables, TContext>(
      {
    mutationKey: ['business_setTwilioPhoneNumber'],
    mutationFn: (variables?: Business_SetTwilioPhoneNumberMutationVariables) => fetcher<Business_SetTwilioPhoneNumberMutation, Business_SetTwilioPhoneNumberMutationVariables>(Business_SetTwilioPhoneNumberDocument, variables)(),
    ...options
  }
    )};

export const Category_AddDocument = `
    mutation category_add($businessId: Int!, $input: CategoryInput) {
  category_add(businessId: $businessId, input: $input) {
    status
  }
}
    `;

export const useCategory_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Category_AddMutation, TError, Category_AddMutationVariables, TContext>) => {
    
    return useMutation<Category_AddMutation, TError, Category_AddMutationVariables, TContext>(
      {
    mutationKey: ['category_add'],
    mutationFn: (variables?: Category_AddMutationVariables) => fetcher<Category_AddMutation, Category_AddMutationVariables>(Category_AddDocument, variables)(),
    ...options
  }
    )};

export const Category_DeleteDocument = `
    mutation category_delete($categoryId: Int!) {
  category_delete(categoryId: $categoryId) {
    status
  }
}
    `;

export const useCategory_DeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Category_DeleteMutation, TError, Category_DeleteMutationVariables, TContext>) => {
    
    return useMutation<Category_DeleteMutation, TError, Category_DeleteMutationVariables, TContext>(
      {
    mutationKey: ['category_delete'],
    mutationFn: (variables?: Category_DeleteMutationVariables) => fetcher<Category_DeleteMutation, Category_DeleteMutationVariables>(Category_DeleteDocument, variables)(),
    ...options
  }
    )};

export const Category_EditDocument = `
    mutation category_edit($categoryId: Int!, $input: CategoryInput) {
  category_edit(categoryId: $categoryId, input: $input) {
    status
  }
}
    `;

export const useCategory_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Category_EditMutation, TError, Category_EditMutationVariables, TContext>) => {
    
    return useMutation<Category_EditMutation, TError, Category_EditMutationVariables, TContext>(
      {
    mutationKey: ['category_edit'],
    mutationFn: (variables?: Category_EditMutationVariables) => fetcher<Category_EditMutation, Category_EditMutationVariables>(Category_EditDocument, variables)(),
    ...options
  }
    )};

export const ContactNetwork_DeleteByIdDocument = `
    mutation contactNetwork_deleteById($contactNetworkId: Int!) {
  contactNetwork_deleteById(contactNetworkId: $contactNetworkId) {
    status
  }
}
    `;

export const useContactNetwork_DeleteByIdMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ContactNetwork_DeleteByIdMutation, TError, ContactNetwork_DeleteByIdMutationVariables, TContext>) => {
    
    return useMutation<ContactNetwork_DeleteByIdMutation, TError, ContactNetwork_DeleteByIdMutationVariables, TContext>(
      {
    mutationKey: ['contactNetwork_deleteById'],
    mutationFn: (variables?: ContactNetwork_DeleteByIdMutationVariables) => fetcher<ContactNetwork_DeleteByIdMutation, ContactNetwork_DeleteByIdMutationVariables>(ContactNetwork_DeleteByIdDocument, variables)(),
    ...options
  }
    )};

export const ContactTagCategory_AddDocument = `
    mutation contactTagCategory_add($contactId: Int!, $input: ContactTagCategoryInput) {
  contactTagCategory_add(contactId: $contactId, input: $input) {
    status
  }
}
    `;

export const useContactTagCategory_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ContactTagCategory_AddMutation, TError, ContactTagCategory_AddMutationVariables, TContext>) => {
    
    return useMutation<ContactTagCategory_AddMutation, TError, ContactTagCategory_AddMutationVariables, TContext>(
      {
    mutationKey: ['contactTagCategory_add'],
    mutationFn: (variables?: ContactTagCategory_AddMutationVariables) => fetcher<ContactTagCategory_AddMutation, ContactTagCategory_AddMutationVariables>(ContactTagCategory_AddDocument, variables)(),
    ...options
  }
    )};

export const ContactTagCategory_DeleteDocument = `
    mutation contactTagCategory_delete($contactTagCategoryId: Int!) {
  contactTagCategory_delete(contactTagCategoryId: $contactTagCategoryId) {
    status
  }
}
    `;

export const useContactTagCategory_DeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ContactTagCategory_DeleteMutation, TError, ContactTagCategory_DeleteMutationVariables, TContext>) => {
    
    return useMutation<ContactTagCategory_DeleteMutation, TError, ContactTagCategory_DeleteMutationVariables, TContext>(
      {
    mutationKey: ['contactTagCategory_delete'],
    mutationFn: (variables?: ContactTagCategory_DeleteMutationVariables) => fetcher<ContactTagCategory_DeleteMutation, ContactTagCategory_DeleteMutationVariables>(ContactTagCategory_DeleteDocument, variables)(),
    ...options
  }
    )};

export const ContactTagCategory_EditDocument = `
    mutation contactTagCategory_edit($contactTagCategoryId: Int!, $input: ContactTagCategoryInput) {
  contactTagCategory_edit(
    contactTagCategoryId: $contactTagCategoryId
    input: $input
  ) {
    result {
      isPinned
      createdDate
      id
      isDeleted
      tagCategory {
        name
        id
        category {
          name
          id
          business {
            id
            name
            logo
          }
        }
      }
      contact {
        id
        fullName
        photoUrl
      }
    }
    status
  }
}
    `;

export const useContactTagCategory_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ContactTagCategory_EditMutation, TError, ContactTagCategory_EditMutationVariables, TContext>) => {
    
    return useMutation<ContactTagCategory_EditMutation, TError, ContactTagCategory_EditMutationVariables, TContext>(
      {
    mutationKey: ['contactTagCategory_edit'],
    mutationFn: (variables?: ContactTagCategory_EditMutationVariables) => fetcher<ContactTagCategory_EditMutation, ContactTagCategory_EditMutationVariables>(ContactTagCategory_EditDocument, variables)(),
    ...options
  }
    )};

export const Contact_AddDocument = `
    mutation contact_add($businessId: Int!, $input: ContactInput) {
  contact_add(businessId: $businessId, input: $input) {
    status
  }
}
    `;

export const useContact_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Contact_AddMutation, TError, Contact_AddMutationVariables, TContext>) => {
    
    return useMutation<Contact_AddMutation, TError, Contact_AddMutationVariables, TContext>(
      {
    mutationKey: ['contact_add'],
    mutationFn: (variables?: Contact_AddMutationVariables) => fetcher<Contact_AddMutation, Contact_AddMutationVariables>(Contact_AddDocument, variables)(),
    ...options
  }
    )};

export const Contact_EditDocument = `
    mutation contact_edit($contactId: Int!, $input: ContactInput) {
  contact_edit(contactId: $contactId, input: $input) {
    status
  }
}
    `;

export const useContact_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Contact_EditMutation, TError, Contact_EditMutationVariables, TContext>) => {
    
    return useMutation<Contact_EditMutation, TError, Contact_EditMutationVariables, TContext>(
      {
    mutationKey: ['contact_edit'],
    mutationFn: (variables?: Contact_EditMutationVariables) => fetcher<Contact_EditMutation, Contact_EditMutationVariables>(Contact_EditDocument, variables)(),
    ...options
  }
    )};

export const Contact_FetchOrCreateByContactDocument = `
    mutation contact_fetchOrCreateByContact($businessKey: String, $input: StartLiveChatInput) {
  contact_fetchOrCreateByContact(businessKey: $businessKey, input: $input) {
    result {
      id
    }
    status
  }
}
    `;

export const useContact_FetchOrCreateByContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Contact_FetchOrCreateByContactMutation, TError, Contact_FetchOrCreateByContactMutationVariables, TContext>) => {
    
    return useMutation<Contact_FetchOrCreateByContactMutation, TError, Contact_FetchOrCreateByContactMutationVariables, TContext>(
      {
    mutationKey: ['contact_fetchOrCreateByContact'],
    mutationFn: (variables?: Contact_FetchOrCreateByContactMutationVariables) => fetcher<Contact_FetchOrCreateByContactMutation, Contact_FetchOrCreateByContactMutationVariables>(Contact_FetchOrCreateByContactDocument, variables)(),
    ...options
  }
    )};

export const Contact_MergeContactDocument = `
    mutation contact_mergeContact($fromContactId: Int!, $toContactId: Int!) {
  contact_mergeContact(fromContactId: $fromContactId, toContactId: $toContactId) {
    status
  }
}
    `;

export const useContact_MergeContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Contact_MergeContactMutation, TError, Contact_MergeContactMutationVariables, TContext>) => {
    
    return useMutation<Contact_MergeContactMutation, TError, Contact_MergeContactMutationVariables, TContext>(
      {
    mutationKey: ['contact_mergeContact'],
    mutationFn: (variables?: Contact_MergeContactMutationVariables) => fetcher<Contact_MergeContactMutation, Contact_MergeContactMutationVariables>(Contact_MergeContactDocument, variables)(),
    ...options
  }
    )};

export const ConversationMember_AddListDocument = `
    mutation conversationMember_addList($conversationId: Int!, $users: [Int!]) {
  conversationMember_addList(conversationId: $conversationId, users: $users) {
    status
  }
}
    `;

export const useConversationMember_AddListMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ConversationMember_AddListMutation, TError, ConversationMember_AddListMutationVariables, TContext>) => {
    
    return useMutation<ConversationMember_AddListMutation, TError, ConversationMember_AddListMutationVariables, TContext>(
      {
    mutationKey: ['conversationMember_addList'],
    mutationFn: (variables?: ConversationMember_AddListMutationVariables) => fetcher<ConversationMember_AddListMutation, ConversationMember_AddListMutationVariables>(ConversationMember_AddListDocument, variables)(),
    ...options
  }
    )};

export const ConversationMessage_SendMessageToGmailDocument = `
    mutation conversationMessage_sendMessageToGmail($input: SendGmailInput) {
  conversationMessage_sendMessageToGmail(input: $input) {
    status
  }
}
    `;

export const useConversationMessage_SendMessageToGmailMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ConversationMessage_SendMessageToGmailMutation, TError, ConversationMessage_SendMessageToGmailMutationVariables, TContext>) => {
    
    return useMutation<ConversationMessage_SendMessageToGmailMutation, TError, ConversationMessage_SendMessageToGmailMutationVariables, TContext>(
      {
    mutationKey: ['conversationMessage_sendMessageToGmail'],
    mutationFn: (variables?: ConversationMessage_SendMessageToGmailMutationVariables) => fetcher<ConversationMessage_SendMessageToGmailMutation, ConversationMessage_SendMessageToGmailMutationVariables>(ConversationMessage_SendMessageToGmailDocument, variables)(),
    ...options
  }
    )};

export const ConversationMessage_SetSeenStatusDocument = `
    mutation conversationMessage_setSeenStatus($ints: [Long!]) {
  conversationMessage_setSeenStatus(ints: $ints) {
    status
  }
}
    `;

export const useConversationMessage_SetSeenStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ConversationMessage_SetSeenStatusMutation, TError, ConversationMessage_SetSeenStatusMutationVariables, TContext>) => {
    
    return useMutation<ConversationMessage_SetSeenStatusMutation, TError, ConversationMessage_SetSeenStatusMutationVariables, TContext>(
      {
    mutationKey: ['conversationMessage_setSeenStatus'],
    mutationFn: (variables?: ConversationMessage_SetSeenStatusMutationVariables) => fetcher<ConversationMessage_SetSeenStatusMutation, ConversationMessage_SetSeenStatusMutationVariables>(ConversationMessage_SetSeenStatusDocument, variables)(),
    ...options
  }
    )};

export const Conversation_EditDocument = `
    mutation conversation_edit($conversationId: Int!, $input: ConversationInput) {
  conversation_edit(conversationId: $conversationId, input: $input) {
    status
  }
}
    `;

export const useConversation_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Conversation_EditMutation, TError, Conversation_EditMutationVariables, TContext>) => {
    
    return useMutation<Conversation_EditMutation, TError, Conversation_EditMutationVariables, TContext>(
      {
    mutationKey: ['conversation_edit'],
    mutationFn: (variables?: Conversation_EditMutationVariables) => fetcher<Conversation_EditMutation, Conversation_EditMutationVariables>(Conversation_EditDocument, variables)(),
    ...options
  }
    )};

export const Conversation_FetchOrCreateByContactDocument = `
    mutation conversation_fetchOrCreateByContact($businessKey: String, $input: ConversationInput) {
  conversation_fetchOrCreateByContact(businessKey: $businessKey, input: $input) {
    result {
      id
    }
    status
  }
}
    `;

export const useConversation_FetchOrCreateByContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Conversation_FetchOrCreateByContactMutation, TError, Conversation_FetchOrCreateByContactMutationVariables, TContext>) => {
    
    return useMutation<Conversation_FetchOrCreateByContactMutation, TError, Conversation_FetchOrCreateByContactMutationVariables, TContext>(
      {
    mutationKey: ['conversation_fetchOrCreateByContact'],
    mutationFn: (variables?: Conversation_FetchOrCreateByContactMutationVariables) => fetcher<Conversation_FetchOrCreateByContactMutation, Conversation_FetchOrCreateByContactMutationVariables>(Conversation_FetchOrCreateByContactDocument, variables)(),
    ...options
  }
    )};

export const Deal_AddDocument = `
    mutation deal_add($contactId: Int!, $input: DealInput) {
  deal_add(contactId: $contactId, input: $input) {
    status
  }
}
    `;

export const useDeal_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Deal_AddMutation, TError, Deal_AddMutationVariables, TContext>) => {
    
    return useMutation<Deal_AddMutation, TError, Deal_AddMutationVariables, TContext>(
      {
    mutationKey: ['deal_add'],
    mutationFn: (variables?: Deal_AddMutationVariables) => fetcher<Deal_AddMutation, Deal_AddMutationVariables>(Deal_AddDocument, variables)(),
    ...options
  }
    )};

export const Deal_DeleteDocument = `
    mutation deal_delete($dealId: Int!) {
  deal_delete(dealId: $dealId) {
    status
  }
}
    `;

export const useDeal_DeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Deal_DeleteMutation, TError, Deal_DeleteMutationVariables, TContext>) => {
    
    return useMutation<Deal_DeleteMutation, TError, Deal_DeleteMutationVariables, TContext>(
      {
    mutationKey: ['deal_delete'],
    mutationFn: (variables?: Deal_DeleteMutationVariables) => fetcher<Deal_DeleteMutation, Deal_DeleteMutationVariables>(Deal_DeleteDocument, variables)(),
    ...options
  }
    )};

export const Deal_EditDocument = `
    mutation deal_edit($dealId: Int!, $input: DealInput) {
  deal_edit(dealId: $dealId, input: $input) {
    status
  }
}
    `;

export const useDeal_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Deal_EditMutation, TError, Deal_EditMutationVariables, TContext>) => {
    
    return useMutation<Deal_EditMutation, TError, Deal_EditMutationVariables, TContext>(
      {
    mutationKey: ['deal_edit'],
    mutationFn: (variables?: Deal_EditMutationVariables) => fetcher<Deal_EditMutation, Deal_EditMutationVariables>(Deal_EditDocument, variables)(),
    ...options
  }
    )};

export const HubSpot_SetByBusinessIdDocument = `
    mutation hubSpot_setByBusinessId($code: String, $businessId: Int!, $redirectLink: String) {
  hubSpot_setByBusinessId(
    code: $code
    businessId: $businessId
    redirectLink: $redirectLink
  ) {
    status
  }
}
    `;

export const useHubSpot_SetByBusinessIdMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<HubSpot_SetByBusinessIdMutation, TError, HubSpot_SetByBusinessIdMutationVariables, TContext>) => {
    
    return useMutation<HubSpot_SetByBusinessIdMutation, TError, HubSpot_SetByBusinessIdMutationVariables, TContext>(
      {
    mutationKey: ['hubSpot_setByBusinessId'],
    mutationFn: (variables?: HubSpot_SetByBusinessIdMutationVariables) => fetcher<HubSpot_SetByBusinessIdMutation, HubSpot_SetByBusinessIdMutationVariables>(HubSpot_SetByBusinessIdDocument, variables)(),
    ...options
  }
    )};

export const HubSpot_SyncSingleContactWithHubSpotDocument = `
    mutation hubSpot_syncSingleContactWithHubSpot($contactId: Int!, $businessId: Int!) {
  hubSpot_syncSingleContactWithHubSpot(
    contactId: $contactId
    businessId: $businessId
  ) {
    status
  }
}
    `;

export const useHubSpot_SyncSingleContactWithHubSpotMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<HubSpot_SyncSingleContactWithHubSpotMutation, TError, HubSpot_SyncSingleContactWithHubSpotMutationVariables, TContext>) => {
    
    return useMutation<HubSpot_SyncSingleContactWithHubSpotMutation, TError, HubSpot_SyncSingleContactWithHubSpotMutationVariables, TContext>(
      {
    mutationKey: ['hubSpot_syncSingleContactWithHubSpot'],
    mutationFn: (variables?: HubSpot_SyncSingleContactWithHubSpotMutationVariables) => fetcher<HubSpot_SyncSingleContactWithHubSpotMutation, HubSpot_SyncSingleContactWithHubSpotMutationVariables>(HubSpot_SyncSingleContactWithHubSpotDocument, variables)(),
    ...options
  }
    )};

export const InternalChat_AddInternalConversationDocument = `
    mutation internalChat_addInternalConversation($internalConveInput: InternalConversationInput) {
  internalChat_addInternalConversation(internalConveInput: $internalConveInput) {
    status
  }
}
    `;

export const useInternalChat_AddInternalConversationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InternalChat_AddInternalConversationMutation, TError, InternalChat_AddInternalConversationMutationVariables, TContext>) => {
    
    return useMutation<InternalChat_AddInternalConversationMutation, TError, InternalChat_AddInternalConversationMutationVariables, TContext>(
      {
    mutationKey: ['internalChat_addInternalConversation'],
    mutationFn: (variables?: InternalChat_AddInternalConversationMutationVariables) => fetcher<InternalChat_AddInternalConversationMutation, InternalChat_AddInternalConversationMutationVariables>(InternalChat_AddInternalConversationDocument, variables)(),
    ...options
  }
    )};

export const InternalChat_AddInternalMessageDocument = `
    mutation internalChat_addInternalMessage($internalMessageInput: InternalMessageInput) {
  internalChat_addInternalMessage(internalMessageInput: $internalMessageInput) {
    status
  }
}
    `;

export const useInternalChat_AddInternalMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InternalChat_AddInternalMessageMutation, TError, InternalChat_AddInternalMessageMutationVariables, TContext>) => {
    
    return useMutation<InternalChat_AddInternalMessageMutation, TError, InternalChat_AddInternalMessageMutationVariables, TContext>(
      {
    mutationKey: ['internalChat_addInternalMessage'],
    mutationFn: (variables?: InternalChat_AddInternalMessageMutationVariables) => fetcher<InternalChat_AddInternalMessageMutation, InternalChat_AddInternalMessageMutationVariables>(InternalChat_AddInternalMessageDocument, variables)(),
    ...options
  }
    )};

export const LiveChat_SendMessageByContactDocument = `
    mutation liveChat_sendMessageByContact($conversationId: Int!, $input: ConversationMessageInput) {
  liveChat_sendMessageByContact(conversationId: $conversationId, input: $input) {
    result {
      id
      typeSocialNetwork
      message
      isAttachment
      conversationId
      conversation {
        id
        type
        createdDate
      }
      conversationMemberId
      conversationMember {
        id
        user {
          id
          fullName
          photoUrl
        }
      }
      conversationAttachments {
        id
        type
        url
      }
      isSentByContact
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useLiveChat_SendMessageByContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LiveChat_SendMessageByContactMutation, TError, LiveChat_SendMessageByContactMutationVariables, TContext>) => {
    
    return useMutation<LiveChat_SendMessageByContactMutation, TError, LiveChat_SendMessageByContactMutationVariables, TContext>(
      {
    mutationKey: ['liveChat_sendMessageByContact'],
    mutationFn: (variables?: LiveChat_SendMessageByContactMutationVariables) => fetcher<LiveChat_SendMessageByContactMutation, LiveChat_SendMessageByContactMutationVariables>(LiveChat_SendMessageByContactDocument, variables)(),
    ...options
  }
    )};

export const LiveChat_SendMessageByMemberDocument = `
    mutation liveChat_sendMessageByMember($conversationId: Int!, $input: ConversationMessageInput) {
  liveChat_sendMessageByMember(conversationId: $conversationId, input: $input) {
    result {
      id
      typeSocialNetwork
      message
      isAttachment
      conversationId
      conversation {
        id
        type
        createdDate
      }
      conversationMemberId
      conversationMember {
        id
        user {
          id
          fullName
          photoUrl
        }
      }
      conversationAttachments {
        id
        type
        url
      }
      isSentByContact
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useLiveChat_SendMessageByMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LiveChat_SendMessageByMemberMutation, TError, LiveChat_SendMessageByMemberMutationVariables, TContext>) => {
    
    return useMutation<LiveChat_SendMessageByMemberMutation, TError, LiveChat_SendMessageByMemberMutationVariables, TContext>(
      {
    mutationKey: ['liveChat_sendMessageByMember'],
    mutationFn: (variables?: LiveChat_SendMessageByMemberMutationVariables) => fetcher<LiveChat_SendMessageByMemberMutation, LiveChat_SendMessageByMemberMutationVariables>(LiveChat_SendMessageByMemberDocument, variables)(),
    ...options
  }
    )};

export const Note_AddDocument = `
    mutation note_add($contactId: Int!, $input: NoteInput) {
  note_add(contactId: $contactId, input: $input) {
    result {
      content
      contact {
        id
        fullName
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useNote_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Note_AddMutation, TError, Note_AddMutationVariables, TContext>) => {
    
    return useMutation<Note_AddMutation, TError, Note_AddMutationVariables, TContext>(
      {
    mutationKey: ['note_add'],
    mutationFn: (variables?: Note_AddMutationVariables) => fetcher<Note_AddMutation, Note_AddMutationVariables>(Note_AddDocument, variables)(),
    ...options
  }
    )};

export const Note_DeleteDocument = `
    mutation note_delete($noteId: Int!) {
  note_delete(noteId: $noteId) {
    status
  }
}
    `;

export const useNote_DeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Note_DeleteMutation, TError, Note_DeleteMutationVariables, TContext>) => {
    
    return useMutation<Note_DeleteMutation, TError, Note_DeleteMutationVariables, TContext>(
      {
    mutationKey: ['note_delete'],
    mutationFn: (variables?: Note_DeleteMutationVariables) => fetcher<Note_DeleteMutation, Note_DeleteMutationVariables>(Note_DeleteDocument, variables)(),
    ...options
  }
    )};

export const Note_EditDocument = `
    mutation note_edit($noteId: Int!, $input: NoteInput) {
  note_edit(noteId: $noteId, input: $input) {
    result {
      content
      contact {
        id
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useNote_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Note_EditMutation, TError, Note_EditMutationVariables, TContext>) => {
    
    return useMutation<Note_EditMutation, TError, Note_EditMutationVariables, TContext>(
      {
    mutationKey: ['note_edit'],
    mutationFn: (variables?: Note_EditMutationVariables) => fetcher<Note_EditMutation, Note_EditMutationVariables>(Note_EditDocument, variables)(),
    ...options
  }
    )};

export const Notification_SetReadStatusDocument = `
    mutation notification_setReadStatus($ids: [Int!]) {
  notification_setReadStatus(ids: $ids) {
    status
  }
}
    `;

export const useNotification_SetReadStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Notification_SetReadStatusMutation, TError, Notification_SetReadStatusMutationVariables, TContext>) => {
    
    return useMutation<Notification_SetReadStatusMutation, TError, Notification_SetReadStatusMutationVariables, TContext>(
      {
    mutationKey: ['notification_setReadStatus'],
    mutationFn: (variables?: Notification_SetReadStatusMutationVariables) => fetcher<Notification_SetReadStatusMutation, Notification_SetReadStatusMutationVariables>(Notification_SetReadStatusDocument, variables)(),
    ...options
  }
    )};

export const Payment_CancelSubscriptionDocument = `
    mutation payment_cancelSubscription {
  payment_cancelSubscription {
    status
  }
}
    `;

export const usePayment_CancelSubscriptionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Payment_CancelSubscriptionMutation, TError, Payment_CancelSubscriptionMutationVariables, TContext>) => {
    
    return useMutation<Payment_CancelSubscriptionMutation, TError, Payment_CancelSubscriptionMutationVariables, TContext>(
      {
    mutationKey: ['payment_cancelSubscription'],
    mutationFn: (variables?: Payment_CancelSubscriptionMutationVariables) => fetcher<Payment_CancelSubscriptionMutation, Payment_CancelSubscriptionMutationVariables>(Payment_CancelSubscriptionDocument, variables)(),
    ...options
  }
    )};

export const Payment_CreateCustomPackageDocument = `
    mutation payment_createCustomPackage($input: CreateCustomPackageInput) {
  payment_createCustomPackage(input: $input) {
    status
  }
}
    `;

export const usePayment_CreateCustomPackageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Payment_CreateCustomPackageMutation, TError, Payment_CreateCustomPackageMutationVariables, TContext>) => {
    
    return useMutation<Payment_CreateCustomPackageMutation, TError, Payment_CreateCustomPackageMutationVariables, TContext>(
      {
    mutationKey: ['payment_createCustomPackage'],
    mutationFn: (variables?: Payment_CreateCustomPackageMutationVariables) => fetcher<Payment_CreateCustomPackageMutation, Payment_CreateCustomPackageMutationVariables>(Payment_CreateCustomPackageDocument, variables)(),
    ...options
  }
    )};

export const Payment_CreatePaymentIntentForCustomPackageDocument = `
    mutation payment_createPaymentIntentForCustomPackage($packageId: Int!) {
  payment_createPaymentIntentForCustomPackage(packageId: $packageId) {
    result {
      clientSecret
      publishKey
    }
    status
  }
}
    `;

export const usePayment_CreatePaymentIntentForCustomPackageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Payment_CreatePaymentIntentForCustomPackageMutation, TError, Payment_CreatePaymentIntentForCustomPackageMutationVariables, TContext>) => {
    
    return useMutation<Payment_CreatePaymentIntentForCustomPackageMutation, TError, Payment_CreatePaymentIntentForCustomPackageMutationVariables, TContext>(
      {
    mutationKey: ['payment_createPaymentIntentForCustomPackage'],
    mutationFn: (variables?: Payment_CreatePaymentIntentForCustomPackageMutationVariables) => fetcher<Payment_CreatePaymentIntentForCustomPackageMutation, Payment_CreatePaymentIntentForCustomPackageMutationVariables>(Payment_CreatePaymentIntentForCustomPackageDocument, variables)(),
    ...options
  }
    )};

export const Payment_CreateSubscriptionDocument = `
    mutation payment_createSubscription($input: CreateSubscriptionInput) {
  payment_createSubscription(input: $input) {
    result
    status
  }
}
    `;

export const usePayment_CreateSubscriptionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Payment_CreateSubscriptionMutation, TError, Payment_CreateSubscriptionMutationVariables, TContext>) => {
    
    return useMutation<Payment_CreateSubscriptionMutation, TError, Payment_CreateSubscriptionMutationVariables, TContext>(
      {
    mutationKey: ['payment_createSubscription'],
    mutationFn: (variables?: Payment_CreateSubscriptionMutationVariables) => fetcher<Payment_CreateSubscriptionMutation, Payment_CreateSubscriptionMutationVariables>(Payment_CreateSubscriptionDocument, variables)(),
    ...options
  }
    )};

export const Payment_ModifyOperatorCountDocument = `
    mutation payment_modifyOperatorCount($quantity: Int!) {
  payment_modifyOperatorCount(quantity: $quantity) {
    status
  }
}
    `;

export const usePayment_ModifyOperatorCountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Payment_ModifyOperatorCountMutation, TError, Payment_ModifyOperatorCountMutationVariables, TContext>) => {
    
    return useMutation<Payment_ModifyOperatorCountMutation, TError, Payment_ModifyOperatorCountMutationVariables, TContext>(
      {
    mutationKey: ['payment_modifyOperatorCount'],
    mutationFn: (variables?: Payment_ModifyOperatorCountMutationVariables) => fetcher<Payment_ModifyOperatorCountMutation, Payment_ModifyOperatorCountMutationVariables>(Payment_ModifyOperatorCountDocument, variables)(),
    ...options
  }
    )};

export const Payment_RemoveCustomPackageDocument = `
    mutation payment_removeCustomPackage($packageId: Int!) {
  payment_removeCustomPackage(packageId: $packageId) {
    status
  }
}
    `;

export const usePayment_RemoveCustomPackageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Payment_RemoveCustomPackageMutation, TError, Payment_RemoveCustomPackageMutationVariables, TContext>) => {
    
    return useMutation<Payment_RemoveCustomPackageMutation, TError, Payment_RemoveCustomPackageMutationVariables, TContext>(
      {
    mutationKey: ['payment_removeCustomPackage'],
    mutationFn: (variables?: Payment_RemoveCustomPackageMutationVariables) => fetcher<Payment_RemoveCustomPackageMutation, Payment_RemoveCustomPackageMutationVariables>(Payment_RemoveCustomPackageDocument, variables)(),
    ...options
  }
    )};

export const SupportChat_AddSupportMessageDocument = `
    mutation supportChat_addSupportMessage($supportMessageInput: SupportMessageInput) {
  supportChat_addSupportMessage(supportMessageInput: $supportMessageInput) {
    result {
      id
    }
    status
  }
}
    `;

export const useSupportChat_AddSupportMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SupportChat_AddSupportMessageMutation, TError, SupportChat_AddSupportMessageMutationVariables, TContext>) => {
    
    return useMutation<SupportChat_AddSupportMessageMutation, TError, SupportChat_AddSupportMessageMutationVariables, TContext>(
      {
    mutationKey: ['supportChat_addSupportMessage'],
    mutationFn: (variables?: SupportChat_AddSupportMessageMutationVariables) => fetcher<SupportChat_AddSupportMessageMutation, SupportChat_AddSupportMessageMutationVariables>(SupportChat_AddSupportMessageDocument, variables)(),
    ...options
  }
    )};

export const SupportChat_AddSupportMessageByAdminDocument = `
    mutation supportChat_addSupportMessageByAdmin($conversationId: Int!, $supportMessageInput: SupportMessageInput) {
  supportChat_addSupportMessageByAdmin(
    conversationId: $conversationId
    supportMessageInput: $supportMessageInput
  ) {
    status
  }
}
    `;

export const useSupportChat_AddSupportMessageByAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SupportChat_AddSupportMessageByAdminMutation, TError, SupportChat_AddSupportMessageByAdminMutationVariables, TContext>) => {
    
    return useMutation<SupportChat_AddSupportMessageByAdminMutation, TError, SupportChat_AddSupportMessageByAdminMutationVariables, TContext>(
      {
    mutationKey: ['supportChat_addSupportMessageByAdmin'],
    mutationFn: (variables?: SupportChat_AddSupportMessageByAdminMutationVariables) => fetcher<SupportChat_AddSupportMessageByAdminMutation, SupportChat_AddSupportMessageByAdminMutationVariables>(SupportChat_AddSupportMessageByAdminDocument, variables)(),
    ...options
  }
    )};

export const SupportChat_AddSupportSurveyDocument = `
    mutation supportChat_addSupportSurvey($conversationId: Int!, $input: SupportChatSurveyDtoInput) {
  supportChat_addSupportSurvey(conversationId: $conversationId, input: $input) {
    status
  }
}
    `;

export const useSupportChat_AddSupportSurveyMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SupportChat_AddSupportSurveyMutation, TError, SupportChat_AddSupportSurveyMutationVariables, TContext>) => {
    
    return useMutation<SupportChat_AddSupportSurveyMutation, TError, SupportChat_AddSupportSurveyMutationVariables, TContext>(
      {
    mutationKey: ['supportChat_addSupportSurvey'],
    mutationFn: (variables?: SupportChat_AddSupportSurveyMutationVariables) => fetcher<SupportChat_AddSupportSurveyMutation, SupportChat_AddSupportSurveyMutationVariables>(SupportChat_AddSupportSurveyDocument, variables)(),
    ...options
  }
    )};

export const TagCategory_AddDocument = `
    mutation tagCategory_add($categoryId: Int!, $input: TagCategoryInput) {
  tagCategory_add(categoryId: $categoryId, input: $input) {
    status
  }
}
    `;

export const useTagCategory_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TagCategory_AddMutation, TError, TagCategory_AddMutationVariables, TContext>) => {
    
    return useMutation<TagCategory_AddMutation, TError, TagCategory_AddMutationVariables, TContext>(
      {
    mutationKey: ['tagCategory_add'],
    mutationFn: (variables?: TagCategory_AddMutationVariables) => fetcher<TagCategory_AddMutation, TagCategory_AddMutationVariables>(TagCategory_AddDocument, variables)(),
    ...options
  }
    )};

export const TagCategory_DeleteDocument = `
    mutation tagCategory_delete($tagCategoryId: Int!) {
  tagCategory_delete(tagCategoryId: $tagCategoryId) {
    status
  }
}
    `;

export const useTagCategory_DeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TagCategory_DeleteMutation, TError, TagCategory_DeleteMutationVariables, TContext>) => {
    
    return useMutation<TagCategory_DeleteMutation, TError, TagCategory_DeleteMutationVariables, TContext>(
      {
    mutationKey: ['tagCategory_delete'],
    mutationFn: (variables?: TagCategory_DeleteMutationVariables) => fetcher<TagCategory_DeleteMutation, TagCategory_DeleteMutationVariables>(TagCategory_DeleteDocument, variables)(),
    ...options
  }
    )};

export const TagCategory_EditDocument = `
    mutation tagCategory_edit($tagCategoryId: Int!, $input: TagCategoryInput) {
  tagCategory_edit(tagCategoryId: $tagCategoryId, input: $input) {
    status
  }
}
    `;

export const useTagCategory_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TagCategory_EditMutation, TError, TagCategory_EditMutationVariables, TContext>) => {
    
    return useMutation<TagCategory_EditMutation, TError, TagCategory_EditMutationVariables, TContext>(
      {
    mutationKey: ['tagCategory_edit'],
    mutationFn: (variables?: TagCategory_EditMutationVariables) => fetcher<TagCategory_EditMutation, TagCategory_EditMutationVariables>(TagCategory_EditDocument, variables)(),
    ...options
  }
    )};

export const Template_AddDocument = `
    mutation template_add($categoryId: Int!, $input: TemplateInput) {
  template_add(categoryId: $categoryId, input: $input) {
    status
  }
}
    `;

export const useTemplate_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Template_AddMutation, TError, Template_AddMutationVariables, TContext>) => {
    
    return useMutation<Template_AddMutation, TError, Template_AddMutationVariables, TContext>(
      {
    mutationKey: ['template_add'],
    mutationFn: (variables?: Template_AddMutationVariables) => fetcher<Template_AddMutation, Template_AddMutationVariables>(Template_AddDocument, variables)(),
    ...options
  }
    )};

export const Template_DeleteDocument = `
    mutation template_delete($templateId: Int!) {
  template_delete(templateId: $templateId) {
    status
  }
}
    `;

export const useTemplate_DeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Template_DeleteMutation, TError, Template_DeleteMutationVariables, TContext>) => {
    
    return useMutation<Template_DeleteMutation, TError, Template_DeleteMutationVariables, TContext>(
      {
    mutationKey: ['template_delete'],
    mutationFn: (variables?: Template_DeleteMutationVariables) => fetcher<Template_DeleteMutation, Template_DeleteMutationVariables>(Template_DeleteDocument, variables)(),
    ...options
  }
    )};

export const Template_EditDocument = `
    mutation template_edit($templateId: Int!, $input: TemplateInput) {
  template_edit(templateId: $templateId, input: $input) {
    status
  }
}
    `;

export const useTemplate_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Template_EditMutation, TError, Template_EditMutationVariables, TContext>) => {
    
    return useMutation<Template_EditMutation, TError, Template_EditMutationVariables, TContext>(
      {
    mutationKey: ['template_edit'],
    mutationFn: (variables?: Template_EditMutationVariables) => fetcher<Template_EditMutation, Template_EditMutationVariables>(Template_EditDocument, variables)(),
    ...options
  }
    )};

export const Ticket_AddDocument = `
    mutation ticket_add($businessId: Int!, $input: TicketInput) {
  ticket_add(businessId: $businessId, input: $input) {
    status
  }
}
    `;

export const useTicket_AddMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Ticket_AddMutation, TError, Ticket_AddMutationVariables, TContext>) => {
    
    return useMutation<Ticket_AddMutation, TError, Ticket_AddMutationVariables, TContext>(
      {
    mutationKey: ['ticket_add'],
    mutationFn: (variables?: Ticket_AddMutationVariables) => fetcher<Ticket_AddMutation, Ticket_AddMutationVariables>(Ticket_AddDocument, variables)(),
    ...options
  }
    )};

export const Ticket_DeleteDocument = `
    mutation ticket_delete($ticketId: Int!) {
  ticket_delete(ticketId: $ticketId) {
    status
  }
}
    `;

export const useTicket_DeleteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Ticket_DeleteMutation, TError, Ticket_DeleteMutationVariables, TContext>) => {
    
    return useMutation<Ticket_DeleteMutation, TError, Ticket_DeleteMutationVariables, TContext>(
      {
    mutationKey: ['ticket_delete'],
    mutationFn: (variables?: Ticket_DeleteMutationVariables) => fetcher<Ticket_DeleteMutation, Ticket_DeleteMutationVariables>(Ticket_DeleteDocument, variables)(),
    ...options
  }
    )};

export const Ticket_EditDocument = `
    mutation ticket_edit($ticketId: Int!, $input: TicketInput) {
  ticket_edit(ticketId: $ticketId, input: $input) {
    status
  }
}
    `;

export const useTicket_EditMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Ticket_EditMutation, TError, Ticket_EditMutationVariables, TContext>) => {
    
    return useMutation<Ticket_EditMutation, TError, Ticket_EditMutationVariables, TContext>(
      {
    mutationKey: ['ticket_edit'],
    mutationFn: (variables?: Ticket_EditMutationVariables) => fetcher<Ticket_EditMutation, Ticket_EditMutationVariables>(Ticket_EditDocument, variables)(),
    ...options
  }
    )};

export const Twilio_AddPhoneNumberDocument = `
    mutation twilio_addPhoneNumber($input: TwilioPhoneNumberInput) {
  twilio_addPhoneNumber(input: $input) {
    status
  }
}
    `;

export const useTwilio_AddPhoneNumberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_AddPhoneNumberMutation, TError, Twilio_AddPhoneNumberMutationVariables, TContext>) => {
    
    return useMutation<Twilio_AddPhoneNumberMutation, TError, Twilio_AddPhoneNumberMutationVariables, TContext>(
      {
    mutationKey: ['twilio_addPhoneNumber'],
    mutationFn: (variables?: Twilio_AddPhoneNumberMutationVariables) => fetcher<Twilio_AddPhoneNumberMutation, Twilio_AddPhoneNumberMutationVariables>(Twilio_AddPhoneNumberDocument, variables)(),
    ...options
  }
    )};

export const Twilio_AnswerCallByCallSidDocument = `
    mutation twilio_answerCallByCallSid($callSid: String) {
  twilio_answerCallByCallSid(callSid: $callSid) {
    status
  }
}
    `;

export const useTwilio_AnswerCallByCallSidMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_AnswerCallByCallSidMutation, TError, Twilio_AnswerCallByCallSidMutationVariables, TContext>) => {
    
    return useMutation<Twilio_AnswerCallByCallSidMutation, TError, Twilio_AnswerCallByCallSidMutationVariables, TContext>(
      {
    mutationKey: ['twilio_answerCallByCallSid'],
    mutationFn: (variables?: Twilio_AnswerCallByCallSidMutationVariables) => fetcher<Twilio_AnswerCallByCallSidMutation, Twilio_AnswerCallByCallSidMutationVariables>(Twilio_AnswerCallByCallSidDocument, variables)(),
    ...options
  }
    )};

export const Twilio_DeletePhoneNumberDocument = `
    mutation twilio_deletePhoneNumber($twilioPhoneNumberId: Int!) {
  twilio_deletePhoneNumber(twilioPhoneNumberId: $twilioPhoneNumberId) {
    status
  }
}
    `;

export const useTwilio_DeletePhoneNumberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_DeletePhoneNumberMutation, TError, Twilio_DeletePhoneNumberMutationVariables, TContext>) => {
    
    return useMutation<Twilio_DeletePhoneNumberMutation, TError, Twilio_DeletePhoneNumberMutationVariables, TContext>(
      {
    mutationKey: ['twilio_deletePhoneNumber'],
    mutationFn: (variables?: Twilio_DeletePhoneNumberMutationVariables) => fetcher<Twilio_DeletePhoneNumberMutation, Twilio_DeletePhoneNumberMutationVariables>(Twilio_DeletePhoneNumberDocument, variables)(),
    ...options
  }
    )};

export const Twilio_EditPhoneNumberDocument = `
    mutation twilio_editPhoneNumber($twilioPhoneNumberId: Int!, $input: TwilioPhoneNumberInput) {
  twilio_editPhoneNumber(twilioPhoneNumberId: $twilioPhoneNumberId, input: $input) {
    status
  }
}
    `;

export const useTwilio_EditPhoneNumberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_EditPhoneNumberMutation, TError, Twilio_EditPhoneNumberMutationVariables, TContext>) => {
    
    return useMutation<Twilio_EditPhoneNumberMutation, TError, Twilio_EditPhoneNumberMutationVariables, TContext>(
      {
    mutationKey: ['twilio_editPhoneNumber'],
    mutationFn: (variables?: Twilio_EditPhoneNumberMutationVariables) => fetcher<Twilio_EditPhoneNumberMutation, Twilio_EditPhoneNumberMutationVariables>(Twilio_EditPhoneNumberDocument, variables)(),
    ...options
  }
    )};

export const Twilio_GenerateVideoRoomDocument = `
    mutation twilio_generateVideoRoom {
  twilio_generateVideoRoom {
    result {
      id
      roomName
      videoSid
    }
    status
  }
}
    `;

export const useTwilio_GenerateVideoRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_GenerateVideoRoomMutation, TError, Twilio_GenerateVideoRoomMutationVariables, TContext>) => {
    
    return useMutation<Twilio_GenerateVideoRoomMutation, TError, Twilio_GenerateVideoRoomMutationVariables, TContext>(
      {
    mutationKey: ['twilio_generateVideoRoom'],
    mutationFn: (variables?: Twilio_GenerateVideoRoomMutationVariables) => fetcher<Twilio_GenerateVideoRoomMutation, Twilio_GenerateVideoRoomMutationVariables>(Twilio_GenerateVideoRoomDocument, variables)(),
    ...options
  }
    )};

export const Twilio_GetVideoRoomTokenDocument = `
    mutation twilio_getVideoRoomToken($identity: String, $roomName: String) {
  twilio_getVideoRoomToken(identity: $identity, roomName: $roomName) {
    result
    status
  }
}
    `;

export const useTwilio_GetVideoRoomTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_GetVideoRoomTokenMutation, TError, Twilio_GetVideoRoomTokenMutationVariables, TContext>) => {
    
    return useMutation<Twilio_GetVideoRoomTokenMutation, TError, Twilio_GetVideoRoomTokenMutationVariables, TContext>(
      {
    mutationKey: ['twilio_getVideoRoomToken'],
    mutationFn: (variables?: Twilio_GetVideoRoomTokenMutationVariables) => fetcher<Twilio_GetVideoRoomTokenMutation, Twilio_GetVideoRoomTokenMutationVariables>(Twilio_GetVideoRoomTokenDocument, variables)(),
    ...options
  }
    )};

export const Twilio_HoldCallByCallSidDocument = `
    mutation twilio_holdCallByCallSid($callSid: String) {
  twilio_holdCallByCallSid(callSid: $callSid) {
    status
  }
}
    `;

export const useTwilio_HoldCallByCallSidMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_HoldCallByCallSidMutation, TError, Twilio_HoldCallByCallSidMutationVariables, TContext>) => {
    
    return useMutation<Twilio_HoldCallByCallSidMutation, TError, Twilio_HoldCallByCallSidMutationVariables, TContext>(
      {
    mutationKey: ['twilio_holdCallByCallSid'],
    mutationFn: (variables?: Twilio_HoldCallByCallSidMutationVariables) => fetcher<Twilio_HoldCallByCallSidMutation, Twilio_HoldCallByCallSidMutationVariables>(Twilio_HoldCallByCallSidDocument, variables)(),
    ...options
  }
    )};

export const Twilio_RejectCallByCallSidDocument = `
    mutation twilio_rejectCallByCallSid($callSid: String) {
  twilio_rejectCallByCallSid(callSid: $callSid) {
    status
  }
}
    `;

export const useTwilio_RejectCallByCallSidMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_RejectCallByCallSidMutation, TError, Twilio_RejectCallByCallSidMutationVariables, TContext>) => {
    
    return useMutation<Twilio_RejectCallByCallSidMutation, TError, Twilio_RejectCallByCallSidMutationVariables, TContext>(
      {
    mutationKey: ['twilio_rejectCallByCallSid'],
    mutationFn: (variables?: Twilio_RejectCallByCallSidMutationVariables) => fetcher<Twilio_RejectCallByCallSidMutation, Twilio_RejectCallByCallSidMutationVariables>(Twilio_RejectCallByCallSidDocument, variables)(),
    ...options
  }
    )};

export const Twilio_SendSmsDocument = `
    mutation twilio_sendSms($conversationId: Int!, $input: SendSmsInput) {
  twilio_sendSms(conversationId: $conversationId, input: $input) {
    status
  }
}
    `;

export const useTwilio_SendSmsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_SendSmsMutation, TError, Twilio_SendSmsMutationVariables, TContext>) => {
    
    return useMutation<Twilio_SendSmsMutation, TError, Twilio_SendSmsMutationVariables, TContext>(
      {
    mutationKey: ['twilio_sendSms'],
    mutationFn: (variables?: Twilio_SendSmsMutationVariables) => fetcher<Twilio_SendSmsMutation, Twilio_SendSmsMutationVariables>(Twilio_SendSmsDocument, variables)(),
    ...options
  }
    )};

export const Twilio_UnHoldCallByCallSidDocument = `
    mutation twilio_unHoldCallByCallSid($callSid: String) {
  twilio_unHoldCallByCallSid(callSid: $callSid) {
    status
  }
}
    `;

export const useTwilio_UnHoldCallByCallSidMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_UnHoldCallByCallSidMutation, TError, Twilio_UnHoldCallByCallSidMutationVariables, TContext>) => {
    
    return useMutation<Twilio_UnHoldCallByCallSidMutation, TError, Twilio_UnHoldCallByCallSidMutationVariables, TContext>(
      {
    mutationKey: ['twilio_unHoldCallByCallSid'],
    mutationFn: (variables?: Twilio_UnHoldCallByCallSidMutationVariables) => fetcher<Twilio_UnHoldCallByCallSidMutation, Twilio_UnHoldCallByCallSidMutationVariables>(Twilio_UnHoldCallByCallSidDocument, variables)(),
    ...options
  }
    )};

export const Twilio_VoiceCallRequestDocument = `
    mutation twilio_voiceCallRequest($businessId: Int!, $input: VoiceCallRequestInput) {
  twilio_voiceCallRequest(businessId: $businessId, input: $input) {
    status
  }
}
    `;

export const useTwilio_VoiceCallRequestMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<Twilio_VoiceCallRequestMutation, TError, Twilio_VoiceCallRequestMutationVariables, TContext>) => {
    
    return useMutation<Twilio_VoiceCallRequestMutation, TError, Twilio_VoiceCallRequestMutationVariables, TContext>(
      {
    mutationKey: ['twilio_voiceCallRequest'],
    mutationFn: (variables?: Twilio_VoiceCallRequestMutationVariables) => fetcher<Twilio_VoiceCallRequestMutation, Twilio_VoiceCallRequestMutationVariables>(Twilio_VoiceCallRequestDocument, variables)(),
    ...options
  }
    )};

export const User_ChangePasswordDocument = `
    mutation user_changePassword($currentPassword: String, $newPassword: String) {
  user_changePassword(
    currentPassword: $currentPassword
    newPassword: $newPassword
  ) {
    status
  }
}
    `;

export const useUser_ChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<User_ChangePasswordMutation, TError, User_ChangePasswordMutationVariables, TContext>) => {
    
    return useMutation<User_ChangePasswordMutation, TError, User_ChangePasswordMutationVariables, TContext>(
      {
    mutationKey: ['user_changePassword'],
    mutationFn: (variables?: User_ChangePasswordMutationVariables) => fetcher<User_ChangePasswordMutation, User_ChangePasswordMutationVariables>(User_ChangePasswordDocument, variables)(),
    ...options
  }
    )};

export const User_EditProfileDocument = `
    mutation user_editProfile($input: UserProfileInput) {
  user_editProfile(input: $input) {
    status
  }
}
    `;

export const useUser_EditProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<User_EditProfileMutation, TError, User_EditProfileMutationVariables, TContext>) => {
    
    return useMutation<User_EditProfileMutation, TError, User_EditProfileMutationVariables, TContext>(
      {
    mutationKey: ['user_editProfile'],
    mutationFn: (variables?: User_EditProfileMutationVariables) => fetcher<User_EditProfileMutation, User_EditProfileMutationVariables>(User_EditProfileDocument, variables)(),
    ...options
  }
    )};

export const User_ExchangeCalendarAuthCodeForTokensDocument = `
    mutation user_exchangeCalendarAuthCodeForTokens($code: String, $redirectUrl: String) {
  user_exchangeCalendarAuthCodeForTokens(code: $code, redirectUrl: $redirectUrl) {
    result {
      accessToken
      expiresIn
      baseTokenExpiration
      tokenType
      scopes
      refreshToken
      expirationTime
    }
    status
  }
}
    `;

export const useUser_ExchangeCalendarAuthCodeForTokensMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<User_ExchangeCalendarAuthCodeForTokensMutation, TError, User_ExchangeCalendarAuthCodeForTokensMutationVariables, TContext>) => {
    
    return useMutation<User_ExchangeCalendarAuthCodeForTokensMutation, TError, User_ExchangeCalendarAuthCodeForTokensMutationVariables, TContext>(
      {
    mutationKey: ['user_exchangeCalendarAuthCodeForTokens'],
    mutationFn: (variables?: User_ExchangeCalendarAuthCodeForTokensMutationVariables) => fetcher<User_ExchangeCalendarAuthCodeForTokensMutation, User_ExchangeCalendarAuthCodeForTokensMutationVariables>(User_ExchangeCalendarAuthCodeForTokensDocument, variables)(),
    ...options
  }
    )};

export const Twilio_GetListPhoneNumberDocument = `
    query Twilio_getListPhoneNumber($skip: Int, $take: Int, $where: TwilioPhoneNumberFilterInput, $order: [TwilioPhoneNumberSortInput!]) {
  Twilio_getListPhoneNumber {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        createdDate
        id
        isDeleted
        isSold
        lastModifiedDate
        phoneNumber
        business {
          name
          id
          logo
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useTwilio_GetListPhoneNumberQuery = <
      TData = Twilio_GetListPhoneNumberQuery,
      TError = unknown
    >(
      variables?: Twilio_GetListPhoneNumberQueryVariables,
      options?: Omit<UseQueryOptions<Twilio_GetListPhoneNumberQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Twilio_GetListPhoneNumberQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Twilio_GetListPhoneNumberQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Twilio_getListPhoneNumber'] : ['Twilio_getListPhoneNumber', variables],
    queryFn: fetcher<Twilio_GetListPhoneNumberQuery, Twilio_GetListPhoneNumberQueryVariables>(Twilio_GetListPhoneNumberDocument, variables),
    ...options
  }
    )};

export const AgencyMember_GetListDocument = `
    query agencyMember_getList($skip: Int, $take: Int, $where: AgencyMemberFilterInput, $order: [AgencyMemberSortInput!]) {
  agencyMember_getList {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        createdDate
        lastModifiedDate
        email
        fullName
        id
        isActive
        isDeleted
        isOnline
        lineStatus
        phoneNumber
        photoUrl
        typeMember
        userType
        isManageAgencyUserAccess
        isSubscriptionAccess
        agency {
          logo
          id
          name
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useAgencyMember_GetListQuery = <
      TData = AgencyMember_GetListQuery,
      TError = unknown
    >(
      variables?: AgencyMember_GetListQueryVariables,
      options?: Omit<UseQueryOptions<AgencyMember_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AgencyMember_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AgencyMember_GetListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['agencyMember_getList'] : ['agencyMember_getList', variables],
    queryFn: fetcher<AgencyMember_GetListQuery, AgencyMember_GetListQueryVariables>(AgencyMember_GetListDocument, variables),
    ...options
  }
    )};

export const AgencyMember_GetListAssignmentDocument = `
    query agencyMember_getListAssignment($businessId: Int, $skip: Int, $take: Int, $where: AgencyMemberAssignmentFilterInput, $order: [AgencyMemberAssignmentSortInput!]) {
  agencyMember_getListAssignment(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        createdDate
        isDeleted
        isOpratorAccess
        isReportAccess
        isSettingsManagmentAccess
        lastModifiedDate
        business {
          logo
          id
          name
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useAgencyMember_GetListAssignmentQuery = <
      TData = AgencyMember_GetListAssignmentQuery,
      TError = unknown
    >(
      variables?: AgencyMember_GetListAssignmentQueryVariables,
      options?: Omit<UseQueryOptions<AgencyMember_GetListAssignmentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AgencyMember_GetListAssignmentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AgencyMember_GetListAssignmentQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['agencyMember_getListAssignment'] : ['agencyMember_getListAssignment', variables],
    queryFn: fetcher<AgencyMember_GetListAssignmentQuery, AgencyMember_GetListAssignmentQueryVariables>(AgencyMember_GetListAssignmentDocument, variables),
    ...options
  }
    )};

export const Agency_GetAccountStateDocument = `
    query agency_getAccountState {
  agency_getAccountState {
    result {
      maxOperatorCount
      activeOperatorCount
      accountExpireDate
    }
    status
  }
}
    `;

export const useAgency_GetAccountStateQuery = <
      TData = Agency_GetAccountStateQuery,
      TError = unknown
    >(
      variables?: Agency_GetAccountStateQueryVariables,
      options?: Omit<UseQueryOptions<Agency_GetAccountStateQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Agency_GetAccountStateQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Agency_GetAccountStateQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['agency_getAccountState'] : ['agency_getAccountState', variables],
    queryFn: fetcher<Agency_GetAccountStateQuery, Agency_GetAccountStateQueryVariables>(Agency_GetAccountStateDocument, variables),
    ...options
  }
    )};

export const Agency_GetDetailsByAdminDocument = `
    query agency_getDetailsByAdmin($agencyId: Int!) {
  agency_getDetailsByAdmin(agencyId: $agencyId) {
    result {
      connectedBusinessCount
      agency {
        createdDate
        id
        name
        logo
        status
        agencyMembers {
          fullName
          id
          email
          photoUrl
          typeMember
          isActive
          createdDate
          phoneNumber
        }
      }
      agencyOwner {
        email
        id
        phoneNumber
        photoUrl
      }
    }
    status
  }
}
    `;

export const useAgency_GetDetailsByAdminQuery = <
      TData = Agency_GetDetailsByAdminQuery,
      TError = unknown
    >(
      variables: Agency_GetDetailsByAdminQueryVariables,
      options?: Omit<UseQueryOptions<Agency_GetDetailsByAdminQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Agency_GetDetailsByAdminQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Agency_GetDetailsByAdminQuery, TError, TData>(
      {
    queryKey: ['agency_getDetailsByAdmin', variables],
    queryFn: fetcher<Agency_GetDetailsByAdminQuery, Agency_GetDetailsByAdminQueryVariables>(Agency_GetDetailsByAdminDocument, variables),
    ...options
  }
    )};

export const Agency_GetListByAdminDocument = `
    query agency_getListByAdmin($skip: Int, $take: Int, $where: AgencyAdminDtoFilterInput, $order: [AgencyAdminDtoSortInput!]) {
  agency_getListByAdmin {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        agency {
          logo
          name
          id
          createdDate
          status
          isDeleted
        }
        agencyOwner {
          email
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useAgency_GetListByAdminQuery = <
      TData = Agency_GetListByAdminQuery,
      TError = unknown
    >(
      variables?: Agency_GetListByAdminQueryVariables,
      options?: Omit<UseQueryOptions<Agency_GetListByAdminQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Agency_GetListByAdminQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Agency_GetListByAdminQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['agency_getListByAdmin'] : ['agency_getListByAdmin', variables],
    queryFn: fetcher<Agency_GetListByAdminQuery, Agency_GetListByAdminQueryVariables>(Agency_GetListByAdminDocument, variables),
    ...options
  }
    )};

export const Agency_GetMemberTeamDocument = `
    query agency_getMemberTeam($permissionType: PermissionType) {
  agency_getMemberTeam(permissionType: $permissionType) {
    result {
      agencyMembers {
        id
        fullName
        photoUrl
      }
      businessAccesses {
        businessTeams {
          id
          fullName
          photoUrl
        }
      }
    }
    status
  }
}
    `;

export const useAgency_GetMemberTeamQuery = <
      TData = Agency_GetMemberTeamQuery,
      TError = unknown
    >(
      variables?: Agency_GetMemberTeamQueryVariables,
      options?: Omit<UseQueryOptions<Agency_GetMemberTeamQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Agency_GetMemberTeamQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Agency_GetMemberTeamQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['agency_getMemberTeam'] : ['agency_getMemberTeam', variables],
    queryFn: fetcher<Agency_GetMemberTeamQuery, Agency_GetMemberTeamQueryVariables>(Agency_GetMemberTeamDocument, variables),
    ...options
  }
    )};

export const BusinessMember_GetListDocument = `
    query businessMember_getList($skip: Int, $take: Int, $where: BusinessMemberFilterInput, $order: [BusinessMemberSortInput!]) {
  businessMember_getList {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        business {
          id
          name
          logo
        }
        createdDate
        lastModifiedDate
        email
        fullName
        id
        isActive
        isDeleted
        isOnline
        lineStatus
        phoneNumber
        photoUrl
        typeMember
        userType
        isManageBusinessUserAccess
        isOpratorAccess
        isReportAccess
        isSettingsManagmentAccess
        isSocialManagmentAccess
        isSubscriptionAccess
      }
      totalCount
    }
    status
  }
}
    `;

export const useBusinessMember_GetListQuery = <
      TData = BusinessMember_GetListQuery,
      TError = unknown
    >(
      variables?: BusinessMember_GetListQueryVariables,
      options?: Omit<UseQueryOptions<BusinessMember_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BusinessMember_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BusinessMember_GetListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['businessMember_getList'] : ['businessMember_getList', variables],
    queryFn: fetcher<BusinessMember_GetListQuery, BusinessMember_GetListQueryVariables>(BusinessMember_GetListDocument, variables),
    ...options
  }
    )};

export const Business_GetAccountStateDocument = `
    query business_getAccountState {
  business_getAccountState {
    result {
      maxOperatorCount
      activeOperatorCount
      accountExpireDate
    }
    status
  }
}
    `;

export const useBusiness_GetAccountStateQuery = <
      TData = Business_GetAccountStateQuery,
      TError = unknown
    >(
      variables?: Business_GetAccountStateQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetAccountStateQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetAccountStateQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetAccountStateQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['business_getAccountState'] : ['business_getAccountState', variables],
    queryFn: fetcher<Business_GetAccountStateQuery, Business_GetAccountStateQueryVariables>(Business_GetAccountStateDocument, variables),
    ...options
  }
    )};

export const Business_GetByBusinessIdDocument = `
    query business_getByBusinessId($businessId: Int) {
  business_getByBusinessId(businessId: $businessId) {
    result {
      name
      logo
      isHideAgency
      id
      isDeleted
      createdDate
      lastModifiedDate
      businessKey
      twilioPhoneNumber {
        id
        phoneNumber
      }
    }
    status
  }
}
    `;

export const useBusiness_GetByBusinessIdQuery = <
      TData = Business_GetByBusinessIdQuery,
      TError = unknown
    >(
      variables?: Business_GetByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetByBusinessIdQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['business_getByBusinessId'] : ['business_getByBusinessId', variables],
    queryFn: fetcher<Business_GetByBusinessIdQuery, Business_GetByBusinessIdQueryVariables>(Business_GetByBusinessIdDocument, variables),
    ...options
  }
    )};

export const Business_GetDetailsByAdminDocument = `
    query business_getDetailsByAdmin($businessId: Int!) {
  business_getDetailsByAdmin(businessId: $businessId) {
    result {
      contactsCount
      business {
        createdDate
        status
        name
        logo
        id
        businessMembers {
          fullName
          photoUrl
          id
          isActive
          id
          email
          typeMember
          createdDate
        }
      }
      businessOwner {
        fullName
        photoUrl
        id
        phoneNumber
        createdDate
      }
    }
    status
  }
}
    `;

export const useBusiness_GetDetailsByAdminQuery = <
      TData = Business_GetDetailsByAdminQuery,
      TError = unknown
    >(
      variables: Business_GetDetailsByAdminQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetDetailsByAdminQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetDetailsByAdminQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetDetailsByAdminQuery, TError, TData>(
      {
    queryKey: ['business_getDetailsByAdmin', variables],
    queryFn: fetcher<Business_GetDetailsByAdminQuery, Business_GetDetailsByAdminQueryVariables>(Business_GetDetailsByAdminDocument, variables),
    ...options
  }
    )};

export const Business_GetGmailAuthLinkDocument = `
    query business_getGmailAuthLink($callbackUrl: String) {
  business_getGmailAuthLink(callbackUrl: $callbackUrl) {
    result
    status
  }
}
    `;

export const useBusiness_GetGmailAuthLinkQuery = <
      TData = Business_GetGmailAuthLinkQuery,
      TError = unknown
    >(
      variables?: Business_GetGmailAuthLinkQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetGmailAuthLinkQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetGmailAuthLinkQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetGmailAuthLinkQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['business_getGmailAuthLink'] : ['business_getGmailAuthLink', variables],
    queryFn: fetcher<Business_GetGmailAuthLinkQuery, Business_GetGmailAuthLinkQueryVariables>(Business_GetGmailAuthLinkDocument, variables),
    ...options
  }
    )};

export const Business_GetListDocument = `
    query business_getList($skip: Int, $take: Int, $where: BusinessFilterInput, $order: [BusinessSortInput!]) {
  business_getList {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        createdDate
        id
        name
        logo
        isHideAgency
        businessMembers {
          email
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useBusiness_GetListQuery = <
      TData = Business_GetListQuery,
      TError = unknown
    >(
      variables?: Business_GetListQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['business_getList'] : ['business_getList', variables],
    queryFn: fetcher<Business_GetListQuery, Business_GetListQueryVariables>(Business_GetListDocument, variables),
    ...options
  }
    )};

export const Business_GetListAgencyRequestsDocument = `
    query business_getListAgencyRequests($businessId: Int, $skip: Int, $take: Int, $where: AgencyMemberAssignmentFilterInput, $order: [AgencyMemberAssignmentSortInput!]) {
  business_getListAgencyRequests(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        businessMember {
          id
          fullName
          email
          photoUrl
          phoneNumber
        }
        agencyMember {
          id
          fullName
          email
          phoneNumber
          photoUrl
        }
        business {
          name
          id
          logo
          status
        }
        id
        colorTag
        createdDate
        lastModifiedDate
        isDeleted
        status
      }
      totalCount
    }
    status
  }
}
    `;

export const useBusiness_GetListAgencyRequestsQuery = <
      TData = Business_GetListAgencyRequestsQuery,
      TError = unknown
    >(
      variables?: Business_GetListAgencyRequestsQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetListAgencyRequestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetListAgencyRequestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetListAgencyRequestsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['business_getListAgencyRequests'] : ['business_getListAgencyRequests', variables],
    queryFn: fetcher<Business_GetListAgencyRequestsQuery, Business_GetListAgencyRequestsQueryVariables>(Business_GetListAgencyRequestsDocument, variables),
    ...options
  }
    )};

export const Business_GetListByAdminDocument = `
    query business_getListByAdmin($skip: Int, $take: Int, $where: BusinessAdminDtoFilterInput, $order: [BusinessAdminDtoSortInput!]) {
  business_getListByAdmin {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        business {
          logo
          name
          id
          createdDate
          status
          isDeleted
        }
        businessOwner {
          email
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useBusiness_GetListByAdminQuery = <
      TData = Business_GetListByAdminQuery,
      TError = unknown
    >(
      variables?: Business_GetListByAdminQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetListByAdminQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetListByAdminQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetListByAdminQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['business_getListByAdmin'] : ['business_getListByAdmin', variables],
    queryFn: fetcher<Business_GetListByAdminQuery, Business_GetListByAdminQueryVariables>(Business_GetListByAdminDocument, variables),
    ...options
  }
    )};

export const Business_GetTeamByBusinessIdDocument = `
    query business_getTeamByBusinessId($businessId: Int!, $permissionType: PermissionType, $skip: Int, $take: Int, $where: UserFilterInput, $order: [UserSortInput!]) {
  business_getTeamByBusinessId(
    businessId: $businessId
    permissionType: $permissionType
  ) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        createdDate
        userType
        photoUrl
        id
        fullName
        lineStatus
        isActive
        isOnline
        isDeleted
        lastModifiedDate
        email
      }
      totalCount
    }
    status
  }
}
    `;

export const useBusiness_GetTeamByBusinessIdQuery = <
      TData = Business_GetTeamByBusinessIdQuery,
      TError = unknown
    >(
      variables: Business_GetTeamByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Business_GetTeamByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Business_GetTeamByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Business_GetTeamByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['business_getTeamByBusinessId', variables],
    queryFn: fetcher<Business_GetTeamByBusinessIdQuery, Business_GetTeamByBusinessIdQueryVariables>(Business_GetTeamByBusinessIdDocument, variables),
    ...options
  }
    )};

export const Category_GetListDocument = `
    query category_getList($businessId: Int!, $skip: Int, $take: Int, $where: CategoryFilterInput, $order: [CategorySortInput!]) {
  category_getList(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        business {
          name
          id
          logo
        }
        createdDate
        id
        isDeleted
        lastModifiedDate
        name
      }
      totalCount
    }
    status
  }
}
    `;

export const useCategory_GetListQuery = <
      TData = Category_GetListQuery,
      TError = unknown
    >(
      variables: Category_GetListQueryVariables,
      options?: Omit<UseQueryOptions<Category_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Category_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Category_GetListQuery, TError, TData>(
      {
    queryKey: ['category_getList', variables],
    queryFn: fetcher<Category_GetListQuery, Category_GetListQueryVariables>(Category_GetListDocument, variables),
    ...options
  }
    )};

export const ContactNetwork_GetListByContactIdDocument = `
    query contactNetwork_getListByContactId($contactId: Int!, $skip: Int, $take: Int, $where: ContactNetworkFilterInput, $order: [ContactNetworkSortInput!]) {
  contactNetwork_getListByContactId(contactId: $contactId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        typeContactNetwork
        value
        url
        id
      }
      totalCount
    }
    status
  }
}
    `;

export const useContactNetwork_GetListByContactIdQuery = <
      TData = ContactNetwork_GetListByContactIdQuery,
      TError = unknown
    >(
      variables: ContactNetwork_GetListByContactIdQueryVariables,
      options?: Omit<UseQueryOptions<ContactNetwork_GetListByContactIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ContactNetwork_GetListByContactIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ContactNetwork_GetListByContactIdQuery, TError, TData>(
      {
    queryKey: ['contactNetwork_getListByContactId', variables],
    queryFn: fetcher<ContactNetwork_GetListByContactIdQuery, ContactNetwork_GetListByContactIdQueryVariables>(ContactNetwork_GetListByContactIdDocument, variables),
    ...options
  }
    )};

export const ContactTagCategory_GetListByContactIdDocument = `
    query contactTagCategory_getListByContactId($contactId: Int!, $skip: Int, $take: Int, $where: ContactTagCategoryFilterInput, $order: [ContactTagCategorySortInput!]) {
  contactTagCategory_getListByContactId(contactId: $contactId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        contact {
          id
          fullName
          photoUrl
        }
        createdDate
        id
        isDeleted
        isPinned
        tagCategory {
          id
          name
          category {
            id
            name
            business {
              id
              name
              logo
            }
          }
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useContactTagCategory_GetListByContactIdQuery = <
      TData = ContactTagCategory_GetListByContactIdQuery,
      TError = unknown
    >(
      variables: ContactTagCategory_GetListByContactIdQueryVariables,
      options?: Omit<UseQueryOptions<ContactTagCategory_GetListByContactIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ContactTagCategory_GetListByContactIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ContactTagCategory_GetListByContactIdQuery, TError, TData>(
      {
    queryKey: ['contactTagCategory_getListByContactId', variables],
    queryFn: fetcher<ContactTagCategory_GetListByContactIdQuery, ContactTagCategory_GetListByContactIdQueryVariables>(ContactTagCategory_GetListByContactIdDocument, variables),
    ...options
  }
    )};

export const Contact_GetByContactIdDocument = `
    query contact_getByContactId($contactId: Int!) {
  contact_getByContactId(contactId: $contactId) {
    result {
      business {
        name
        id
        logo
      }
      company
      createdDate
      dealStatus
      firstName
      lastName
      fullName
      id
      isDeleted
      hubSpotContactId
      jobTitle
      lastModifiedDate
      photoUrl
    }
    status
  }
}
    `;

export const useContact_GetByContactIdQuery = <
      TData = Contact_GetByContactIdQuery,
      TError = unknown
    >(
      variables: Contact_GetByContactIdQueryVariables,
      options?: Omit<UseQueryOptions<Contact_GetByContactIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Contact_GetByContactIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Contact_GetByContactIdQuery, TError, TData>(
      {
    queryKey: ['contact_getByContactId', variables],
    queryFn: fetcher<Contact_GetByContactIdQuery, Contact_GetByContactIdQueryVariables>(Contact_GetByContactIdDocument, variables),
    ...options
  }
    )};

export const Contact_GetListByBusinessIdDocument = `
    query contact_getListByBusinessId($businessId: Int!, $skip: Int, $take: Int, $where: ContactFilterInput, $order: [ContactSortInput!]) {
  contact_getListByBusinessId(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        conversationId
        conversation {
          conversationMembers {
            userId
          }
        }
        business {
          id
          name
          logo
        }
        company
        createdDate
        fullName
        firstName
        lastName
        id
        hubSpotContactId
        jobTitle
        lastModifiedDate
        photoUrl
        contactNetworks {
          id
          url
          value
          typeContactNetwork
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useContact_GetListByBusinessIdQuery = <
      TData = Contact_GetListByBusinessIdQuery,
      TError = unknown
    >(
      variables: Contact_GetListByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Contact_GetListByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Contact_GetListByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Contact_GetListByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['contact_getListByBusinessId', variables],
    queryFn: fetcher<Contact_GetListByBusinessIdQuery, Contact_GetListByBusinessIdQueryVariables>(Contact_GetListByBusinessIdDocument, variables),
    ...options
  }
    )};

export const ConversationMessage_GetByConversationIdDocument = `
    query conversationMessage_getByConversationId($conversationId: Int!, $skip: Int, $take: Int, $where: ConversationMessageFilterInput, $order: [ConversationMessageSortInput!]) {
  conversationMessage_getByConversationId(conversationId: $conversationId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        metaData
        createdDate
        isAttachment
        conversationMemberId
        isSentByContact
        message
        isReplyTo
        subject
        summaryReplyMessage
        typeSocialNetwork
        conversationMember {
          userId
          user {
            id
            fullName
            email
            photoUrl
            email
          }
        }
        conversationAttachments {
          createdDate
          id
          type
          url
        }
        conversation {
          title
          id
          contact {
            id
            firstName
            photoUrl
            fullName
          }
          conversationMembers {
            userId
            user {
              id
              fullName
              phoneNumber
              photoUrl
              email
            }
          }
          createdDate
          id
          type
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useConversationMessage_GetByConversationIdQuery = <
      TData = ConversationMessage_GetByConversationIdQuery,
      TError = unknown
    >(
      variables: ConversationMessage_GetByConversationIdQueryVariables,
      options?: Omit<UseQueryOptions<ConversationMessage_GetByConversationIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ConversationMessage_GetByConversationIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ConversationMessage_GetByConversationIdQuery, TError, TData>(
      {
    queryKey: ['conversationMessage_getByConversationId', variables],
    queryFn: fetcher<ConversationMessage_GetByConversationIdQuery, ConversationMessage_GetByConversationIdQueryVariables>(ConversationMessage_GetByConversationIdDocument, variables),
    ...options
  }
    )};

export const Conversation_GetByBusinessIdDocument = `
    query conversation_getByBusinessId($businessId: Int!, $skip: Int, $take: Int, $where: ConversationFilterInput, $order: [ConversationSortInput!]) {
  conversation_getByBusinessId(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        contact {
          fullName
          photoUrl
          id
        }
        business {
          id
          name
          status
        }
        createdDate
        lastModifiedDate
        id
        type
      }
      totalCount
    }
    status
  }
}
    `;

export const useConversation_GetByBusinessIdQuery = <
      TData = Conversation_GetByBusinessIdQuery,
      TError = unknown
    >(
      variables: Conversation_GetByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Conversation_GetByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Conversation_GetByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Conversation_GetByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['conversation_getByBusinessId', variables],
    queryFn: fetcher<Conversation_GetByBusinessIdQuery, Conversation_GetByBusinessIdQueryVariables>(Conversation_GetByBusinessIdDocument, variables),
    ...options
  }
    )};

export const Conversation_GetConversationByContactIdDocument = `
    query conversation_getConversationByContactId($contactId: Int!) {
  conversation_getConversationByContactId(contactId: $contactId) {
    result {
      type
      businessId
      id
      createdDate
      lastModifiedDate
    }
    status
  }
}
    `;

export const useConversation_GetConversationByContactIdQuery = <
      TData = Conversation_GetConversationByContactIdQuery,
      TError = unknown
    >(
      variables: Conversation_GetConversationByContactIdQueryVariables,
      options?: Omit<UseQueryOptions<Conversation_GetConversationByContactIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Conversation_GetConversationByContactIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Conversation_GetConversationByContactIdQuery, TError, TData>(
      {
    queryKey: ['conversation_getConversationByContactId', variables],
    queryFn: fetcher<Conversation_GetConversationByContactIdQuery, Conversation_GetConversationByContactIdQueryVariables>(Conversation_GetConversationByContactIdDocument, variables),
    ...options
  }
    )};

export const Conversation_GetListDocument = `
    query conversation_getList($skip: Int, $take: Int, $where: ConversationFilterInput, $order: [ConversationSortInput!]) {
  conversation_getList {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        title
        numberOfUnreadMessages
        lastMessage {
          id
          conversationMember {
            userId
          }
        }
        conversationMembers {
          userId
          user {
            id
            fullName
            phoneNumber
            photoUrl
          }
        }
        conversationMessages {
          message
          id
          isSeen
          conversationMember {
            userId
          }
        }
        contact {
          id
          photoUrl
          fullName
        }
        business {
          id
          logo
          name
          status
        }
        createdDate
        lastModifiedDate
        type
      }
      totalCount
    }
    status
  }
}
    `;

export const useConversation_GetListQuery = <
      TData = Conversation_GetListQuery,
      TError = unknown
    >(
      variables?: Conversation_GetListQueryVariables,
      options?: Omit<UseQueryOptions<Conversation_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Conversation_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Conversation_GetListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['conversation_getList'] : ['conversation_getList', variables],
    queryFn: fetcher<Conversation_GetListQuery, Conversation_GetListQueryVariables>(Conversation_GetListDocument, variables),
    ...options
  }
    )};

export const Conversation_GetUnseenMessagesByTypeDocument = `
    query conversation_getUnseenMessagesByType($skip: Int, $take: Int, $where: UnseenMessagesByTypeDtoFilterInput, $order: [UnseenMessagesByTypeDtoSortInput!]) {
  conversation_getUnseenMessagesByType {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        countUnseenMessages
        typeSocialNetwork
      }
      totalCount
    }
    status
  }
}
    `;

export const useConversation_GetUnseenMessagesByTypeQuery = <
      TData = Conversation_GetUnseenMessagesByTypeQuery,
      TError = unknown
    >(
      variables?: Conversation_GetUnseenMessagesByTypeQueryVariables,
      options?: Omit<UseQueryOptions<Conversation_GetUnseenMessagesByTypeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Conversation_GetUnseenMessagesByTypeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Conversation_GetUnseenMessagesByTypeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['conversation_getUnseenMessagesByType'] : ['conversation_getUnseenMessagesByType', variables],
    queryFn: fetcher<Conversation_GetUnseenMessagesByTypeQuery, Conversation_GetUnseenMessagesByTypeQueryVariables>(Conversation_GetUnseenMessagesByTypeDocument, variables),
    ...options
  }
    )};

export const Deal_GetListByBusinessIdDocument = `
    query deal_getListByBusinessId($businessId: Int!, $skip: Int, $take: Int, $where: DealFilterInput, $order: [DealSortInput!]) {
  deal_getListByBusinessId(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        contact {
          id
          fullName
          photoUrl
          createdDate
          firstName
          lastName
          company
          jobTitle
          isDeleted
          lastModifiedDate
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useDeal_GetListByBusinessIdQuery = <
      TData = Deal_GetListByBusinessIdQuery,
      TError = unknown
    >(
      variables: Deal_GetListByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Deal_GetListByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Deal_GetListByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Deal_GetListByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['deal_getListByBusinessId', variables],
    queryFn: fetcher<Deal_GetListByBusinessIdQuery, Deal_GetListByBusinessIdQueryVariables>(Deal_GetListByBusinessIdDocument, variables),
    ...options
  }
    )};

export const Deal_GetListByContactIdDocument = `
    query deal_getListByContactId($contactId: Int!, $skip: Int, $take: Int, $where: DealFilterInput, $order: [DealSortInput!]) {
  deal_getListByContactId(contactId: $contactId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        contact {
          id
          fullName
          photoUrl
        }
        createdDate
        dealStatus
        endDate
        id
        isDeleted
        lastModifiedDate
        price
        title
      }
      totalCount
    }
    status
  }
}
    `;

export const useDeal_GetListByContactIdQuery = <
      TData = Deal_GetListByContactIdQuery,
      TError = unknown
    >(
      variables: Deal_GetListByContactIdQueryVariables,
      options?: Omit<UseQueryOptions<Deal_GetListByContactIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Deal_GetListByContactIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Deal_GetListByContactIdQuery, TError, TData>(
      {
    queryKey: ['deal_getListByContactId', variables],
    queryFn: fetcher<Deal_GetListByContactIdQuery, Deal_GetListByContactIdQueryVariables>(Deal_GetListByContactIdDocument, variables),
    ...options
  }
    )};

export const HubSpot_GetAuthLinkDocument = `
    query hubSpot_getAuthLink($redirectLink: String) {
  hubSpot_getAuthLink(redirectLink: $redirectLink) {
    result
    status
  }
}
    `;

export const useHubSpot_GetAuthLinkQuery = <
      TData = HubSpot_GetAuthLinkQuery,
      TError = unknown
    >(
      variables?: HubSpot_GetAuthLinkQueryVariables,
      options?: Omit<UseQueryOptions<HubSpot_GetAuthLinkQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HubSpot_GetAuthLinkQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HubSpot_GetAuthLinkQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['hubSpot_getAuthLink'] : ['hubSpot_getAuthLink', variables],
    queryFn: fetcher<HubSpot_GetAuthLinkQuery, HubSpot_GetAuthLinkQueryVariables>(HubSpot_GetAuthLinkDocument, variables),
    ...options
  }
    )};

export const Note_GetListByContactIdDocument = `
    query note_getListByContactId($contactId: Int!, $skip: Int, $take: Int, $where: NoteFilterInput, $order: [NoteSortInput!]) {
  note_getListByContactId(contactId: $contactId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        content
        createdDate
        id
        lastModifiedDate
        contact {
          id
          fullName
          photoUrl
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useNote_GetListByContactIdQuery = <
      TData = Note_GetListByContactIdQuery,
      TError = unknown
    >(
      variables: Note_GetListByContactIdQueryVariables,
      options?: Omit<UseQueryOptions<Note_GetListByContactIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Note_GetListByContactIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Note_GetListByContactIdQuery, TError, TData>(
      {
    queryKey: ['note_getListByContactId', variables],
    queryFn: fetcher<Note_GetListByContactIdQuery, Note_GetListByContactIdQueryVariables>(Note_GetListByContactIdDocument, variables),
    ...options
  }
    )};

export const Notification_GetListDocument = `
    query notification_getList($skip: Int, $take: Int, $where: NotificationFilterInput, $order: [NotificationSortInput!]) {
  notification_getList {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        content
        createdDate
        isSeen
        lastModifiedDate
        message
        type
        user {
          id
          fullName
          photoUrl
        }
        userId
      }
      totalCount
    }
    status
  }
}
    `;

export const useNotification_GetListQuery = <
      TData = Notification_GetListQuery,
      TError = unknown
    >(
      variables?: Notification_GetListQueryVariables,
      options?: Omit<UseQueryOptions<Notification_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Notification_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Notification_GetListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['notification_getList'] : ['notification_getList', variables],
    queryFn: fetcher<Notification_GetListQuery, Notification_GetListQueryVariables>(Notification_GetListDocument, variables),
    ...options
  }
    )};

export const PaymentHistory_CheckActiveSubscriptionDocument = `
    query paymentHistory_checkActiveSubscription {
  paymentHistory_checkActiveSubscription {
    result
    status
  }
}
    `;

export const usePaymentHistory_CheckActiveSubscriptionQuery = <
      TData = PaymentHistory_CheckActiveSubscriptionQuery,
      TError = unknown
    >(
      variables?: PaymentHistory_CheckActiveSubscriptionQueryVariables,
      options?: Omit<UseQueryOptions<PaymentHistory_CheckActiveSubscriptionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PaymentHistory_CheckActiveSubscriptionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PaymentHistory_CheckActiveSubscriptionQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['paymentHistory_checkActiveSubscription'] : ['paymentHistory_checkActiveSubscription', variables],
    queryFn: fetcher<PaymentHistory_CheckActiveSubscriptionQuery, PaymentHistory_CheckActiveSubscriptionQueryVariables>(PaymentHistory_CheckActiveSubscriptionDocument, variables),
    ...options
  }
    )};

export const PaymentHistory_GetListDocument = `
    query paymentHistory_getList($skip: Int, $take: Int, $where: PaymentHistoryFilterInput, $order: [PaymentHistorySortInput!]) {
  paymentHistory_getList {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        createdDate
        creator {
          id
          fullName
          phoneNumber
          photoUrl
          email
          userType
        }
        discount
        expireDate
        invoiceId
        lastModifiedDate
        operatorCount
        owner {
          id
          fullName
          photoUrl
          email
          userType
        }
        packageDuration
        paymentStatus
        paymentType
        subscriptionId
        totalPrice
      }
      totalCount
    }
    status
  }
}
    `;

export const usePaymentHistory_GetListQuery = <
      TData = PaymentHistory_GetListQuery,
      TError = unknown
    >(
      variables?: PaymentHistory_GetListQueryVariables,
      options?: Omit<UseQueryOptions<PaymentHistory_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PaymentHistory_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PaymentHistory_GetListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['paymentHistory_getList'] : ['paymentHistory_getList', variables],
    queryFn: fetcher<PaymentHistory_GetListQuery, PaymentHistory_GetListQueryVariables>(PaymentHistory_GetListDocument, variables),
    ...options
  }
    )};

export const Payment_CalculateSubscriptionDocument = `
    query payment_calculateSubscription($input: CalculateSubscriptionCostInput) {
  payment_calculateSubscription(input: $input) {
    result {
      price
      discount
    }
    status
  }
}
    `;

export const usePayment_CalculateSubscriptionQuery = <
      TData = Payment_CalculateSubscriptionQuery,
      TError = unknown
    >(
      variables?: Payment_CalculateSubscriptionQueryVariables,
      options?: Omit<UseQueryOptions<Payment_CalculateSubscriptionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Payment_CalculateSubscriptionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Payment_CalculateSubscriptionQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['payment_calculateSubscription'] : ['payment_calculateSubscription', variables],
    queryFn: fetcher<Payment_CalculateSubscriptionQuery, Payment_CalculateSubscriptionQueryVariables>(Payment_CalculateSubscriptionDocument, variables),
    ...options
  }
    )};

export const Payment_CancelingSubscriptionCostDocument = `
    query payment_cancelingSubscriptionCost {
  payment_cancelingSubscriptionCost {
    result
    status
  }
}
    `;

export const usePayment_CancelingSubscriptionCostQuery = <
      TData = Payment_CancelingSubscriptionCostQuery,
      TError = unknown
    >(
      variables?: Payment_CancelingSubscriptionCostQueryVariables,
      options?: Omit<UseQueryOptions<Payment_CancelingSubscriptionCostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Payment_CancelingSubscriptionCostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Payment_CancelingSubscriptionCostQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['payment_cancelingSubscriptionCost'] : ['payment_cancelingSubscriptionCost', variables],
    queryFn: fetcher<Payment_CancelingSubscriptionCostQuery, Payment_CancelingSubscriptionCostQueryVariables>(Payment_CancelingSubscriptionCostDocument, variables),
    ...options
  }
    )};

export const Payment_OperatorModificationCostDocument = `
    query payment_operatorModificationCost($operatorCount: Int!) {
  payment_operatorModificationCost(operatorCount: $operatorCount) {
    result {
      cost
      period
    }
    status
  }
}
    `;

export const usePayment_OperatorModificationCostQuery = <
      TData = Payment_OperatorModificationCostQuery,
      TError = unknown
    >(
      variables: Payment_OperatorModificationCostQueryVariables,
      options?: Omit<UseQueryOptions<Payment_OperatorModificationCostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Payment_OperatorModificationCostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Payment_OperatorModificationCostQuery, TError, TData>(
      {
    queryKey: ['payment_operatorModificationCost', variables],
    queryFn: fetcher<Payment_OperatorModificationCostQuery, Payment_OperatorModificationCostQueryVariables>(Payment_OperatorModificationCostDocument, variables),
    ...options
  }
    )};

export const Report_GetAverageTimeOnHoldReportDocument = `
    query report_getAverageTimeOnHoldReport($input: MutualReportInput) {
  report_getAverageTimeOnHoldReport(input: $input) {
    result {
      typeSocialNetwork
      avgResponseTime
    }
    status
  }
}
    `;

export const useReport_GetAverageTimeOnHoldReportQuery = <
      TData = Report_GetAverageTimeOnHoldReportQuery,
      TError = unknown
    >(
      variables?: Report_GetAverageTimeOnHoldReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetAverageTimeOnHoldReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetAverageTimeOnHoldReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetAverageTimeOnHoldReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getAverageTimeOnHoldReport'] : ['report_getAverageTimeOnHoldReport', variables],
    queryFn: fetcher<Report_GetAverageTimeOnHoldReportQuery, Report_GetAverageTimeOnHoldReportQueryVariables>(Report_GetAverageTimeOnHoldReportDocument, variables),
    ...options
  }
    )};

export const Report_GetBestConversionChannelDocument = `
    query report_getBestConversionChannel($input: MutualReportInput) {
  report_getBestConversionChannel(input: $input) {
    result {
      typeSocialNetwork
      portionPercent
      totalRevenue
    }
    status
  }
}
    `;

export const useReport_GetBestConversionChannelQuery = <
      TData = Report_GetBestConversionChannelQuery,
      TError = unknown
    >(
      variables?: Report_GetBestConversionChannelQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetBestConversionChannelQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetBestConversionChannelQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetBestConversionChannelQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getBestConversionChannel'] : ['report_getBestConversionChannel', variables],
    queryFn: fetcher<Report_GetBestConversionChannelQuery, Report_GetBestConversionChannelQueryVariables>(Report_GetBestConversionChannelDocument, variables),
    ...options
  }
    )};

export const Report_GetConversationAvgResponseTimeReportDocument = `
    query report_getConversationAvgResponseTimeReport($input: MutualReportInput) {
  report_getConversationAvgResponseTimeReport(input: $input) {
    result {
      avgResponseTime
      operatorFullName
      operatorId
    }
    status
  }
}
    `;

export const useReport_GetConversationAvgResponseTimeReportQuery = <
      TData = Report_GetConversationAvgResponseTimeReportQuery,
      TError = unknown
    >(
      variables?: Report_GetConversationAvgResponseTimeReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetConversationAvgResponseTimeReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetConversationAvgResponseTimeReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetConversationAvgResponseTimeReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getConversationAvgResponseTimeReport'] : ['report_getConversationAvgResponseTimeReport', variables],
    queryFn: fetcher<Report_GetConversationAvgResponseTimeReportQuery, Report_GetConversationAvgResponseTimeReportQueryVariables>(Report_GetConversationAvgResponseTimeReportDocument, variables),
    ...options
  }
    )};

export const Report_GetCustomerStatusReportDocument = `
    query report_getCustomerStatusReport($input: MutualReportInput) {
  report_getCustomerStatusReport(input: $input) {
    result {
      typeSocialNetwork
      leadCustomerCount
      appointmentScheduledCustomerCount
      closedWonCustomerCount
    }
    status
  }
}
    `;

export const useReport_GetCustomerStatusReportQuery = <
      TData = Report_GetCustomerStatusReportQuery,
      TError = unknown
    >(
      variables?: Report_GetCustomerStatusReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetCustomerStatusReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetCustomerStatusReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetCustomerStatusReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getCustomerStatusReport'] : ['report_getCustomerStatusReport', variables],
    queryFn: fetcher<Report_GetCustomerStatusReportQuery, Report_GetCustomerStatusReportQueryVariables>(Report_GetCustomerStatusReportDocument, variables),
    ...options
  }
    )};

export const Report_GetPaymentReportDocument = `
    query report_getPaymentReport($input: ReportTimeFrameInput) {
  report_getPaymentReport(input: $input) {
    result {
      timeUnit
      totalPayment
    }
    status
  }
}
    `;

export const useReport_GetPaymentReportQuery = <
      TData = Report_GetPaymentReportQuery,
      TError = unknown
    >(
      variables?: Report_GetPaymentReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetPaymentReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetPaymentReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetPaymentReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getPaymentReport'] : ['report_getPaymentReport', variables],
    queryFn: fetcher<Report_GetPaymentReportQuery, Report_GetPaymentReportQueryVariables>(Report_GetPaymentReportDocument, variables),
    ...options
  }
    )};

export const Report_GetPendingConversationReportDocument = `
    query report_getPendingConversationReport($input: MutualReportInput) {
  report_getPendingConversationReport(input: $input) {
    result {
      conversationId
      isLead
    }
    status
  }
}
    `;

export const useReport_GetPendingConversationReportQuery = <
      TData = Report_GetPendingConversationReportQuery,
      TError = unknown
    >(
      variables?: Report_GetPendingConversationReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetPendingConversationReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetPendingConversationReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetPendingConversationReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getPendingConversationReport'] : ['report_getPendingConversationReport', variables],
    queryFn: fetcher<Report_GetPendingConversationReportQuery, Report_GetPendingConversationReportQueryVariables>(Report_GetPendingConversationReportDocument, variables),
    ...options
  }
    )};

export const Report_GetTagCategoryReportDocument = `
    query report_getTagCategoryReport($input: TagCategoryReportInput) {
  report_getTagCategoryReport(input: $input) {
    result {
      tagCategoryName
      count
    }
    status
  }
}
    `;

export const useReport_GetTagCategoryReportQuery = <
      TData = Report_GetTagCategoryReportQuery,
      TError = unknown
    >(
      variables?: Report_GetTagCategoryReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetTagCategoryReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetTagCategoryReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetTagCategoryReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getTagCategoryReport'] : ['report_getTagCategoryReport', variables],
    queryFn: fetcher<Report_GetTagCategoryReportQuery, Report_GetTagCategoryReportQueryVariables>(Report_GetTagCategoryReportDocument, variables),
    ...options
  }
    )};

export const Report_GetTeamPerformanceOnDealReportDocument = `
    query report_getTeamPerformanceOnDealReport($input: TeamPerformanceOnDealReportInput) {
  report_getTeamPerformanceOnDealReport(input: $input) {
    result {
      teamMemberId
      teamMemberFullName
      portionPercent
    }
    status
  }
}
    `;

export const useReport_GetTeamPerformanceOnDealReportQuery = <
      TData = Report_GetTeamPerformanceOnDealReportQuery,
      TError = unknown
    >(
      variables?: Report_GetTeamPerformanceOnDealReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetTeamPerformanceOnDealReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetTeamPerformanceOnDealReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetTeamPerformanceOnDealReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getTeamPerformanceOnDealReport'] : ['report_getTeamPerformanceOnDealReport', variables],
    queryFn: fetcher<Report_GetTeamPerformanceOnDealReportQuery, Report_GetTeamPerformanceOnDealReportQueryVariables>(Report_GetTeamPerformanceOnDealReportDocument, variables),
    ...options
  }
    )};

export const Report_GetTicketReportDocument = `
    query report_getTicketReport($input: TicketReportInput) {
  report_getTicketReport(input: $input) {
    result {
      ticketCount
      timeUnit
    }
    status
  }
}
    `;

export const useReport_GetTicketReportQuery = <
      TData = Report_GetTicketReportQuery,
      TError = unknown
    >(
      variables?: Report_GetTicketReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetTicketReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetTicketReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetTicketReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getTicketReport'] : ['report_getTicketReport', variables],
    queryFn: fetcher<Report_GetTicketReportQuery, Report_GetTicketReportQueryVariables>(Report_GetTicketReportDocument, variables),
    ...options
  }
    )};

export const Report_GetTwilioCallReportDocument = `
    query report_getTwilioCallReport($input: MutualReportInput) {
  report_getTwilioCallReport(input: $input) {
    result {
      teamMemberId
      totalAvgResponseTime
      totalCallCount
      totalIncomingCall
      totalMissedCall
      under180sCallAvgResponseTime
      under180sCallCount
      under180sIncomingCall
      teamMemberFullName
    }
    status
  }
}
    `;

export const useReport_GetTwilioCallReportQuery = <
      TData = Report_GetTwilioCallReportQuery,
      TError = unknown
    >(
      variables?: Report_GetTwilioCallReportQueryVariables,
      options?: Omit<UseQueryOptions<Report_GetTwilioCallReportQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Report_GetTwilioCallReportQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Report_GetTwilioCallReportQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['report_getTwilioCallReport'] : ['report_getTwilioCallReport', variables],
    queryFn: fetcher<Report_GetTwilioCallReportQuery, Report_GetTwilioCallReportQueryVariables>(Report_GetTwilioCallReportDocument, variables),
    ...options
  }
    )};

export const SupportChat_GetListDocument = `
    query supportChat_getList($skip: Int, $take: Int, $where: ConversationFilterInput, $order: [ConversationSortInput!]) {
  supportChat_getList {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        contact {
          id
          fullName
          photoUrl
        }
        createdDate
        lastModifiedDate
        numberOfUnreadMessages
        lastMessage {
          id
          conversationMember {
            userId
          }
        }
        conversationMembers {
          id
          user {
            fullName
            photoUrl
            id
          }
        }
        conversationMessages {
          metaData
          conversationId
          conversation {
            id
          }
          createdDate
          id
          isAttachment
          isSeen
          isDeleted
          isSentByContact
          message
          typeSocialNetwork
          conversationAttachments {
            url
            type
            createdDate
            id
          }
          conversationMember {
            id
            user {
              id
              fullName
              photoUrl
              email
            }
          }
          conversationMember {
            id
            user {
              id
              fullName
              photoUrl
            }
          }
          contactNetwork {
            contact {
              fullName
              id
              photoUrl
            }
            url
            value
            typeContactNetwork
          }
          conversationAttachments {
            url
            type
            createdDate
            id
          }
        }
        title
        type
        id
        business {
          id
          name
          logo
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useSupportChat_GetListQuery = <
      TData = SupportChat_GetListQuery,
      TError = unknown
    >(
      variables?: SupportChat_GetListQueryVariables,
      options?: Omit<UseQueryOptions<SupportChat_GetListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<SupportChat_GetListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<SupportChat_GetListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['supportChat_getList'] : ['supportChat_getList', variables],
    queryFn: fetcher<SupportChat_GetListQuery, SupportChat_GetListQueryVariables>(SupportChat_GetListDocument, variables),
    ...options
  }
    )};

export const TagCategory_GetListByBusinessIdDocument = `
    query tagCategory_getListByBusinessId($businessId: Int!, $skip: Int, $take: Int, $where: TagCategoryFilterInput, $order: [TagCategorySortInput!]) {
  tagCategory_getListByBusinessId(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        category {
          name
          id
        }
        createdDate
        id
        isDeleted
        lastModifiedDate
        name
      }
      totalCount
    }
    status
  }
}
    `;

export const useTagCategory_GetListByBusinessIdQuery = <
      TData = TagCategory_GetListByBusinessIdQuery,
      TError = unknown
    >(
      variables: TagCategory_GetListByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<TagCategory_GetListByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<TagCategory_GetListByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<TagCategory_GetListByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['tagCategory_getListByBusinessId', variables],
    queryFn: fetcher<TagCategory_GetListByBusinessIdQuery, TagCategory_GetListByBusinessIdQueryVariables>(TagCategory_GetListByBusinessIdDocument, variables),
    ...options
  }
    )};

export const TagCategory_GetListByCategoryIdDocument = `
    query tagCategory_getListByCategoryId($categoryId: Int!, $skip: Int, $take: Int, $where: TagCategoryFilterInput, $order: [TagCategorySortInput!]) {
  tagCategory_getListByCategoryId(categoryId: $categoryId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        category {
          name
          id
        }
        createdDate
        id
        isDeleted
        lastModifiedDate
        name
      }
      totalCount
    }
    status
  }
}
    `;

export const useTagCategory_GetListByCategoryIdQuery = <
      TData = TagCategory_GetListByCategoryIdQuery,
      TError = unknown
    >(
      variables: TagCategory_GetListByCategoryIdQueryVariables,
      options?: Omit<UseQueryOptions<TagCategory_GetListByCategoryIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<TagCategory_GetListByCategoryIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<TagCategory_GetListByCategoryIdQuery, TError, TData>(
      {
    queryKey: ['tagCategory_getListByCategoryId', variables],
    queryFn: fetcher<TagCategory_GetListByCategoryIdQuery, TagCategory_GetListByCategoryIdQueryVariables>(TagCategory_GetListByCategoryIdDocument, variables),
    ...options
  }
    )};

export const Template_GetListByBusinessIdDocument = `
    query template_getListByBusinessId($businessId: Int!, $skip: Int, $take: Int, $where: TemplateFilterInput, $order: [TemplateSortInput!]) {
  template_getListByBusinessId(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        content
        title
        id
      }
      totalCount
    }
    status
  }
}
    `;

export const useTemplate_GetListByBusinessIdQuery = <
      TData = Template_GetListByBusinessIdQuery,
      TError = unknown
    >(
      variables: Template_GetListByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Template_GetListByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Template_GetListByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Template_GetListByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['template_getListByBusinessId', variables],
    queryFn: fetcher<Template_GetListByBusinessIdQuery, Template_GetListByBusinessIdQueryVariables>(Template_GetListByBusinessIdDocument, variables),
    ...options
  }
    )};

export const Template_GetListByCategoryIdDocument = `
    query template_getListByCategoryId($categoryId: Int!, $skip: Int, $take: Int, $where: TemplateFilterInput, $order: [TemplateSortInput!]) {
  template_getListByCategoryId(categoryId: $categoryId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        category {
          id
          name
        }
        content
        createdDate
        id
        isDeleted
        lastModifiedDate
        title
      }
      totalCount
    }
    status
  }
}
    `;

export const useTemplate_GetListByCategoryIdQuery = <
      TData = Template_GetListByCategoryIdQuery,
      TError = unknown
    >(
      variables: Template_GetListByCategoryIdQueryVariables,
      options?: Omit<UseQueryOptions<Template_GetListByCategoryIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Template_GetListByCategoryIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Template_GetListByCategoryIdQuery, TError, TData>(
      {
    queryKey: ['template_getListByCategoryId', variables],
    queryFn: fetcher<Template_GetListByCategoryIdQuery, Template_GetListByCategoryIdQueryVariables>(Template_GetListByCategoryIdDocument, variables),
    ...options
  }
    )};

export const Ticket_GetListByBusinessIdDocument = `
    query ticket_getListByBusinessId($businessId: Int!, $skip: Int, $take: Int, $where: TicketFilterInput, $order: [TicketSortInput!]) {
  ticket_getListByBusinessId(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        assignUser {
          id
          fullName
          photoUrl
          email
        }
        business {
          name
          id
          logo
        }
        contact {
          id
          fullName
          photoUrl
        }
        creator {
          id
          fullName
          photoUrl
          email
        }
        meetingLink
        metaData
        createdDate
        lastModifiedDate
        description
        endDate
        estimate
        id
        isAppointment
        isDeleted
        startDate
        status
        summary
      }
      totalCount
    }
    status
  }
}
    `;

export const useTicket_GetListByBusinessIdQuery = <
      TData = Ticket_GetListByBusinessIdQuery,
      TError = unknown
    >(
      variables: Ticket_GetListByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Ticket_GetListByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Ticket_GetListByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Ticket_GetListByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['ticket_getListByBusinessId', variables],
    queryFn: fetcher<Ticket_GetListByBusinessIdQuery, Ticket_GetListByBusinessIdQueryVariables>(Ticket_GetListByBusinessIdDocument, variables),
    ...options
  }
    )};

export const Twilio_GetCallTokenDocument = `
    query twilio_getCallToken($businessId: Int!) {
  twilio_getCallToken(businessId: $businessId) {
    result {
      inboundClientId
      outboundClientId
      token
    }
    status
  }
}
    `;

export const useTwilio_GetCallTokenQuery = <
      TData = Twilio_GetCallTokenQuery,
      TError = unknown
    >(
      variables: Twilio_GetCallTokenQueryVariables,
      options?: Omit<UseQueryOptions<Twilio_GetCallTokenQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Twilio_GetCallTokenQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Twilio_GetCallTokenQuery, TError, TData>(
      {
    queryKey: ['twilio_getCallToken', variables],
    queryFn: fetcher<Twilio_GetCallTokenQuery, Twilio_GetCallTokenQueryVariables>(Twilio_GetCallTokenDocument, variables),
    ...options
  }
    )};

export const Twilio_GetHistoryVideosByBusinessIdDocument = `
    query twilio_getHistoryVideosByBusinessId($businessId: Int!, $skip: Int, $take: Int, $where: TwilioHistoryVideoFilterInput, $order: [TwilioHistoryVideoSortInput!]) {
  twilio_getHistoryVideosByBusinessId(businessId: $businessId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        createdDate
        lastModifiedDate
        creatorUser {
          id
          fullName
          phoneNumber
          photoUrl
        }
        duration
        endTime
        id
        isRecordDone
        recordUrl
        roomName
        videoSid
        videoStatus
        conversationMessage {
          message
          conversation {
            business {
              id
              name
              logo
              status
            }
            contact {
              id
              fullName
              photoUrl
            }
          }
          typeSocialNetwork
          twilioHistoryVideo {
            id
            roomName
            createdDate
            videoStatus
            duration
            endTime
          }
          contactNetwork {
            value
            url
            typeContactNetwork
            id
            contact {
              id
              fullName
              photoUrl
              business {
                id
                name
                logo
              }
            }
            createdDate
          }
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const useTwilio_GetHistoryVideosByBusinessIdQuery = <
      TData = Twilio_GetHistoryVideosByBusinessIdQuery,
      TError = unknown
    >(
      variables: Twilio_GetHistoryVideosByBusinessIdQueryVariables,
      options?: Omit<UseQueryOptions<Twilio_GetHistoryVideosByBusinessIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Twilio_GetHistoryVideosByBusinessIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Twilio_GetHistoryVideosByBusinessIdQuery, TError, TData>(
      {
    queryKey: ['twilio_getHistoryVideosByBusinessId', variables],
    queryFn: fetcher<Twilio_GetHistoryVideosByBusinessIdQuery, Twilio_GetHistoryVideosByBusinessIdQueryVariables>(Twilio_GetHistoryVideosByBusinessIdDocument, variables),
    ...options
  }
    )};

export const User_GetAccountStatusDocument = `
    query user_getAccountStatus {
  user_getAccountStatus {
    status
  }
}
    `;

export const useUser_GetAccountStatusQuery = <
      TData = User_GetAccountStatusQuery,
      TError = unknown
    >(
      variables?: User_GetAccountStatusQueryVariables,
      options?: Omit<UseQueryOptions<User_GetAccountStatusQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<User_GetAccountStatusQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<User_GetAccountStatusQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['user_getAccountStatus'] : ['user_getAccountStatus', variables],
    queryFn: fetcher<User_GetAccountStatusQuery, User_GetAccountStatusQueryVariables>(User_GetAccountStatusDocument, variables),
    ...options
  }
    )};

export const User_GetCalendarAccessTokenDocument = `
    query user_getCalendarAccessToken {
  user_getCalendarAccessToken {
    result
    status
  }
}
    `;

export const useUser_GetCalendarAccessTokenQuery = <
      TData = User_GetCalendarAccessTokenQuery,
      TError = unknown
    >(
      variables?: User_GetCalendarAccessTokenQueryVariables,
      options?: Omit<UseQueryOptions<User_GetCalendarAccessTokenQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<User_GetCalendarAccessTokenQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<User_GetCalendarAccessTokenQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['user_getCalendarAccessToken'] : ['user_getCalendarAccessToken', variables],
    queryFn: fetcher<User_GetCalendarAccessTokenQuery, User_GetCalendarAccessTokenQueryVariables>(User_GetCalendarAccessTokenDocument, variables),
    ...options
  }
    )};

export const User_GetCalendarAuthLinkDocument = `
    query user_getCalendarAuthLink($redirectUrl: String) {
  user_getCalendarAuthLink(redirectUrl: $redirectUrl) {
    result
    status
  }
}
    `;

export const useUser_GetCalendarAuthLinkQuery = <
      TData = User_GetCalendarAuthLinkQuery,
      TError = unknown
    >(
      variables?: User_GetCalendarAuthLinkQueryVariables,
      options?: Omit<UseQueryOptions<User_GetCalendarAuthLinkQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<User_GetCalendarAuthLinkQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<User_GetCalendarAuthLinkQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['user_getCalendarAuthLink'] : ['user_getCalendarAuthLink', variables],
    queryFn: fetcher<User_GetCalendarAuthLinkQuery, User_GetCalendarAuthLinkQueryVariables>(User_GetCalendarAuthLinkDocument, variables),
    ...options
  }
    )};

export const User_GetCurrentUserDocument = `
    query user_getCurrentUser {
  user_getCurrentUser {
    result {
      isAgency
      isBusinessOwner
      user {
        userType
        id
        fullName
        createdDate
        email
        externalId
        isActive
        isOnline
        isDeleted
        lastModifiedDate
        lineStatus
        phoneNumber
        photoUrl
      }
      businessAccesses {
        business {
          id
          name
          logo
          createdDate
          lastModifiedDate
          isDeleted
          isHideAgency
          status
          twilioPhoneNumber {
            id
            phoneNumber
          }
          categories {
            id
            name
          }
          businessMembers {
            id
            typeMember
          }
        }
        access {
          isManageAgencyUserAccess
          isManageBusinessUserAccess
          isOpratorAccess
          isReportAccess
          isSettingsManagmentAccess
          isSocialManagmentAccess
        }
      }
    }
    status
  }
}
    `;

export const useUser_GetCurrentUserQuery = <
      TData = User_GetCurrentUserQuery,
      TError = unknown
    >(
      variables?: User_GetCurrentUserQueryVariables,
      options?: Omit<UseQueryOptions<User_GetCurrentUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<User_GetCurrentUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<User_GetCurrentUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['user_getCurrentUser'] : ['user_getCurrentUser', variables],
    queryFn: fetcher<User_GetCurrentUserQuery, User_GetCurrentUserQueryVariables>(User_GetCurrentUserDocument, variables),
    ...options
  }
    )};

export const ConversationMessageDocument = `
    subscription conversationMessage($userId: Int!) {
  conversationMessage(userId: $userId) {
    id
    typeSocialNetwork
    message
    isAttachment
    conversationId
    twilioHistoryCall {
      callSid
      callStatus
      clientId
      createdDate
      direction
      duration
      endTime
      enqueue
      from
      hasCallBeenAnswered
      id
      isRecordDone
      lastModifiedDate
      recordUrl
      to
      user {
        id
        fullName
        phoneNumber
        photoUrl
      }
      wasOperatorAvailable
    }
    contactNetwork {
      id
      typeContactNetwork
      value
    }
    conversation {
      numberOfUnreadMessages
      type
      isPinned
      businessId
      business {
        id
        logo
        name
      }
      contact {
        id
        photoUrl
        fullName
        contactNetworks {
          value
        }
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    conversationMember {
      userId
      conversationId
      user {
        id
        fullName
        photoUrl
        email
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    conversationAttachments {
      type
      url
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    conversationMemberId
    isSentByContact
    isDeleted
    createdDate
    lastModifiedDate
  }
}
    `;
export const ConversationMessageByContactDocument = `
    subscription conversationMessageByContact($contactId: Int!) {
  conversationMessageByContact(contactId: $contactId) {
    id
    typeSocialNetwork
    message
    isAttachment
    conversationId
    conversation {
      type
      isPinned
      businessId
      contact {
        fullName
        photoUrl
        id
        contactNetworks {
          value
        }
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    conversationMember {
      conversationId
      user {
        id
        photoUrl
        fullName
        email
      }
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    conversationAttachments {
      type
      url
      conversationMessageId
      id
      isDeleted
      createdDate
    }
    conversationMemberId
    isSentByContact
    createdDate
    lastModifiedDate
  }
}
    `;
export const NotificationDocument = `
    subscription notification($userId: Int!) {
  notification(userId: $userId) {
    type
    content
    message
    isSeen
    userId
    id
    isDeleted
    createdDate
    lastModifiedDate
  }
}
    `;
export const TwilioCallChangeDocument = `
    subscription twilioCallChange($userId: Int!) {
  twilioCallChange(userId: $userId) {
    callSid
    enqueue
    clientId
    callStatus
    endTime
    isRecordDone
    recordUrl
    duration
    hasCallBeenAnswered
    wasOperatorAvailable
    direction
    from
    to
    userId
    user {
      userType
      lineStatus
      isActive
      isOnline
      twilioHistoryCalls {
        callSid
        callStatus
        clientId
        conversationMessage {
          typeSocialNetwork
          message
          conversation {
            businessId
            business {
              id
              name
              logo
            }
            createdDate
            numberOfUnreadMessages
            id
          }
          contactNetwork {
            createdDate
            typeContactNetwork
            url
            value
            contact {
              businessId
              business {
                id
                name
                logo
              }
              id
              fullName
              photoUrl
            }
          }
        }
      }
      externalId
      email
      photoUrl
      fullName
      phoneNumber
      about
      location
      age
      dateOfBirth
      id
      isDeleted
      createdDate
      lastModifiedDate
    }
    id
    isDeleted
    createdDate
    lastModifiedDate
  }
}
    `;
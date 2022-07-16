# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
1. For the first step, we need a way to capture the custom agent ids for each Agent by the facility. For this following changes need to be done. 
    i. Change the `Facility` table to add one more column
        isSupportCustomAgentId (boolean)
        This will enable us to identify whether this new feature, will be used by the current facility or not, as not all facilities may need the feature(assumption. If not the case, the point i can be ignored fully).
    ii. New database table to capture the interlinkage with following detils
        `FacilityAgentsCustomTable`
            facilityId (foreign key from Facilities table)
            agentId (foreign key from Agent table)
            customAgentId (varchar)
            unique constraint on the table for combination of facilityId,agentId so as not to allow duplicate data
    iii. A portal which has to be exposed to the facilities who want custom agentids, where they can update the agents associated with them. This involves
        Creating a new web portal linking with the existing facilities portal (Assumption that such a portal exists)
        Ability to view all the agents
        Create custom Ids for the agents
        Edit the custom Ids for the agents
2. The next step involves modifying the quarterly report where the facilities should see custom ids for their agents. For this following changes need to be done.
    i. Either 
        `getShiftsByFacility` needs to be modified by linking the facility id and agentid (assuming that agentid is also part of the metadata) to obtain custom agent ids as part of agent metadata. This is done by
            - Fetching custom agentIds from `FacilityAgentsCustomTable` table based on facilityId and agentId. 
            - This can be achieved either joining the new table with in the existing query fetch itself or a list of agentIds can be captured which are part of existing query fetch and fetching customAgentIds from `FacilityAgentsCustomTable` by querying based on facilityId and agentId in 'agentIds'
            - update the agent metadata along with the new information

        or 
        a new custom function can be written post fetching the data from `getShiftsByFacility`. 
            - In this we will fetch all the agentIds
            - Fetch customAgentIds from `FacilityAgentsCustomTable` by querying based on facilityId and agentId in 'agentIds'
            - construct a map with key as agentId and value as customAgentId
            - update the agent metadata for each shift
    ii. Based on the complexity and use of `getShiftsByFacility` function in other places, a call can be taken. If `getShiftsByFacility` is also used by other places quite a lot, new custom function can be built, if not then `getShiftsByFacility` could be modified as discussed in #i of (2)
3. The final step involves modifying the existing `generateReport` function. For this, following changes need to be done. Assuming the shift info contains the metadata of each associated agent and each agent metadata has been updated in (2)
    i. Iterate through the shift details, 
        if the agent metadata contains the customAgentId, then we will print it instead of agentId
        if the agent metadata doesnt contain such customAgentId, we will print it as ususal.

export const PRIORITIES = {
    Low: "Low",    
    Middle: "Middle",    
    High: "High",
    LowId: 1,
    MiddleId: 2,
    HighId: 3
}

class Global {

    
    static priorityDescriptionResolver (priority) {    
        
        let priorityId = parseInt(priority);

        switch (priorityId) {
            case PRIORITIES.LowId:
                return PRIORITIES.Low;

            case PRIORITIES.MiddleId:
                return PRIORITIES.Middle;

            case PRIORITIES.HighId:
                return PRIORITIES.High;                
        
            default:
                return "?";
        }

    }

}

export default Global;
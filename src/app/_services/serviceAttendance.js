export const getUniqueRecords = (attendanceList) => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList?.forEach((ele) => {
      if (!existingUser.has(ele.studentId)) {
        existingUser.add(ele.studentId);
        uniqueRecord.push(ele);
      }
    });
    return uniqueRecord;
  };


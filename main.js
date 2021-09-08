// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, dnaBase) => {
  return {
    specimenNum: num,
    dna: dnaBase,

    mutate() {
      let randomBase = Math.floor(Math.random() * this.dna.length)
      let newBase = returnRandBase()

      // as long as the selected index of dna base is the same as
      // the new mutated base keep
      // generate a new base value to the new base.
      while(this.dna[randomBase] === newBase) newBase = returnRandBase()
      // console.log(this.dna[randomBase] + randomBase)
      // console.log(newBase)
      this.dna.splice(randomBase, 1, newBase)
    },

    compareDNA(species) {
      let identical = 0
      for(i = 0; i < species.dna.length - 1; i++) {
        if (this.dna[i] === species.dna[i]) identical += 1
      }
      console.log(`specimen #${this.specimenNum} and specimen #${species.specimenNum} have ${Math.floor((identical / species.dna.length) * 100)}% DNA in common.`)
    },

    willLikelySurvive() {
      const dna = this.dna
      let containsCG = 0
      for(let i = 0; i < dna.length - 1; i++) {
        if (dna[i] === "C" || dna[i] === "G") containsCG++
      }

      return Math.floor(containsCG / dna.length * 100) >= 60
    }
  }
}


// Creating 30 instances of pAequor that can survive in
// their natural enviroment.

let speciesList = []
let speciesNum = 1
while(speciesList.length < 30) {
  if (pAequorFactory(speciesNum, mockUpStrand()).willLikelySurvive()) {
    speciesList.push(pAequorFactory(speciesNum, mockUpStrand()))
    speciesNum++
  }
}

console.log(speciesList.length)
